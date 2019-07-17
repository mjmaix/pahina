import { fetchRequiredData } from './fetchRequiredData';
import { ProcessingError } from '../utils/ProcessingError';
import { generateUserStoreProduct } from './generateUserStoreProduct';
import { pretty } from '../utils/simpleUtils';
import { generateShopifyProduct } from './getShopifyProduct';
import Shopify from '../connections/Shopify';
import AwsDynamoDB from '../connections/AwsDynamoDB';
import { getProductUpdateParam } from './getProductUpdateParam';
import { Response } from 'node-fetch';

export const publishProduct = async (note: NoteRecord) => {
  let userRecord: UserRecord | null = null;
  let caseRecord: CaseRecord | null = null;
  let storeRecord: PahinaStoreRecord | null = null;
  ({ storeRecord, userRecord, caseRecord } = await fetchRequiredData(note));

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
    userRecord,
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
  user: UserRecord,
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
    resp = await Shopify.postProduct(postData);
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
    return resp;
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
