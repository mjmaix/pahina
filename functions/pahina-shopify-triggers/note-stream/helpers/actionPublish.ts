import { PromiseType } from 'utility-types';

import ShopifyRest from '../../shared/shopify/ShopifyRest';
import { ProcessingError } from '../../shared/utils/ProcessingError';
import AwsDynamoDB from '../../shared/aws/AwsDynamoDB';
import { pretty } from '../../shared/utils/simpleUtils';

import { fetchRequiredData } from './fetchRequiredData';
import { generateUserStoreProduct } from './generateUserStoreProduct';
import { generateShopifyProduct } from './getShopifyProduct';
import { getProductUpdateParam } from './getProductUpdateParam';

type Response = PromiseType<ReturnType<typeof ShopifyRest.postCreate>>;

export const publishProduct = async (note: NoteRecord) => {
  let cognitoUser: CognitoUser | null = null;
  let userRecord: UserRecord | null = null;
  let caseRecord: CaseRecord | null = null;
  let storeRecord: PahinaStoreRecord | null = null;
  ({
    cognitoUser,
    storeRecord,
    userRecord,
    caseRecord,
  } = await fetchRequiredData(note));

  if (!userRecord) {
    throw new ProcessingError('Failed to get User');
  }

  if (!storeRecord) {
    throw new ProcessingError('Failed to get UserStore');
  }

  if (!caseRecord) {
    throw new ProcessingError('Failed to get Case');
  }

  const product = await saveProductOnDb(storeRecord, note);
  if (!product) {
    throw new ProcessingError('Failed to insert/retrieve UserStoreProduct');
  }

  const postProductResp = await sendShopifyPostProduct(
    cognitoUser,
    caseRecord,
    note,
  ); // throws error if digital sig is not expected
  if (!postProductResp) {
    throw new ProcessingError('Failed post product to Shopify');
  }

  const updatedProduct = await updateProductOnDb(product, postProductResp);
  if (!updatedProduct) {
    throw new ProcessingError('Failed to update UserStoreProduct');
  }
};

const sendShopifyPostProduct = async (
  user: CognitoUser,
  caseRec: CaseRecord,
  note: NoteRecord,
) => {
  // NOTE: does not need to check digital sig since this is not a webhook
  // let digitalSig = null;
  let resp: Response | null = null;
  // const sharedSecret = await Shopify.getSharedSecret();
  try {
    const postData = generateShopifyProduct(user, note, caseRec);
    // digitalSig = hmacEncrypt(sharedSecret, JSON.stringify(postData));
    resp = await ShopifyRest.postCreate<{ product: any }>(postData, 'products');
    const body = await resp.json();
    const headers = resp.headers.raw();
    console.log(
      '[SUCCESS] create product on Shopify',
      pretty(headers),
      pretty(body),
    );
    return { body, headers };
  } catch (err) {
    console.log('[ERROR] create product on Shopify', pretty(err));
    throw err;
  }

  // if (resp && digitalSig) {
  //   await validateShopifyResponse(resp, digitalSig); // throw if error
  // }
};

const saveProductOnDb = async (store: PahinaStoreRecord, note: NoteRecord) => {
  let product: ProductRecord | null = null;

  const params: PutItemInput = generateUserStoreProduct(store, note);
  try {
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] put UserStoreProduct', pretty(data));
    product = (params.Item as unknown) as ProductRecord;
  } catch (err) {
    console.log('[ERROR] put UserStoreProduct', err);
  }

  return product;
};

const updateProductOnDb = async (
  product: ProductRecord,
  { body, headers }: any,
) => {
  let savedProduct: ProductRecord | null = null;
  try {
    const params: UpdateItemInput = await getProductUpdateParam(product, {
      body,
      headers,
    });
    const data: UpdateItemOutput = await AwsDynamoDB.updateItem(params);
    console.log('[SUCCESS] save post response UserStoreProduct', pretty(data));
    savedProduct = data as ProductRecord;
  } catch (err) {
    console.log('[ERROR] save post response UserStoreProduct', err);
  }

  return savedProduct;
};
