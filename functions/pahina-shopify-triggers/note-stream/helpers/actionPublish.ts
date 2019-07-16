import { fetchRequiredData } from './fetchRequiredData';
import { ProcessingError } from '../utils/ProcessingError';
import { generateUserStoreProduct } from './generateUserStoreProduct';
import { pretty } from '../utils/simpleUtils';
import { generateShopifyProduct } from './getShopifyProduct';
import { hmacEncrypt } from '../utils/hmac';
import Shopify from '../connections/Shopify';
import AwsDynamoDB from '../connections/AwsDynamoDB';
import { getUpdateInfoFromShopifyProductResponse as getUpdateInfoFromShopify } from './getUpdateInfoFromShopifyProductResponse';
import { validateShopifyResponse } from './validateShopifyResponse';

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

  const updatedProduct = await saveShopifyResponseOnDb(
    product,
    postProductResp,
  );
  if (!updatedProduct) {
    throw new ProcessingError('Failed to update UserStoreProduct');
  }
};

const sendShopifyPostProduct = async (
  user: UserRecord,
  caseRec: CaseRecord,
  note: NoteRecord,
) => {
  let digitalSig = null;
  let resp: Response | null = null;
  const sharedSecret = await Shopify.getSharedSecret();
  try {
    const postData = generateShopifyProduct(user, note, caseRec);
    digitalSig = hmacEncrypt(sharedSecret, JSON.stringify(postData));
    resp = await Shopify.postProduct(postData);

    console.log('[SUCCESS] create product on Shopify', pretty(resp));
  } catch (err) {
    console.log('[ERROR] create product on Shopify', err);
  }

  if (resp && digitalSig) {
    await validateShopifyResponse(resp, digitalSig); // throw if error
  }

  return resp;
};

const saveProductOnDb = async (store: PahinaStoreRecord, note: NoteRecord) => {
  let product: ProductRecord | null = null;

  const params: PutItemInput = generateUserStoreProduct(store, note);
  try {
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] put UserStoreProduct', pretty(data));
    product = (data as unknown) as ProductRecord;
  } catch (err) {
    console.log('[ERROR] put UserStoreProduct', err);
  }

  return product;
};

const saveShopifyResponseOnDb = async (
  product: ProductRecord,
  resp: Response,
) => {
  const { body, headers } = await resp.json();
  let savedProduct: ProductRecord | null = null;
  try {
    const params: PutItemInput = await getUpdateInfoFromShopify(product, {
      body,
      headers,
    });
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] save post response UserStoreProduct', pretty(data));
    savedProduct = data as ProductRecord;
  } catch (err) {
    console.log('[ERROR] save post response UserStoreProduct', err);
  }

  return savedProduct;
};
