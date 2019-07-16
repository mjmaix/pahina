import {
  PahinaNoteRecord,
  PahinaUserRecord,
  PahinaStoreRecord,
  PahinaUserStoreProductRecord,
  PutItemInput,
  PutItemOutput,
} from '../types';
import { fetchUserStore } from './getUserStore';
import { ProcessingError } from '../utils/ProcessingError';
import { generateUserStoreProduct } from './generateUserStoreProduct';
import { pretty } from '../utils/simpleUtils';
import { generateShopifyProduct } from './getShopifyProduct';
import { hmacEncrypt } from '../utils/hmac';
import Shopify from '../connections/Shopify';
import AwsDynamoDB from '../connections/AwsDynamoDB';
import { getUpdateInfoFromShopifyProductResponse as getUpdateInfoFromShopify } from './getUpdateInfoFromShopifyProductResponse';
import { validateShopifyResponse } from './validateShopifyResponse';

export const publishProduct = async (note: PahinaNoteRecord) => {
  let user: PahinaUserRecord | null = null;
  let store: PahinaStoreRecord | null = null;
  ({ store, user } = await fetchUserStore(note));

  if (!user) {
    throw new ProcessingError('Failed to get User');
  }

  if (!store) {
    throw new ProcessingError('Failed to get UserStore');
  }

  const product = await saveProductOnDb(store, note);
  if (!product) {
    throw new ProcessingError('Failed to insert/retrieve UserStoreProduct');
  }

  const postProductResp = await sendShopifyPostProduct(user, note); // throws error if digital sig is not expected
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
  user: PahinaUserRecord,
  note: PahinaNoteRecord,
) => {
  let digitalSig = null;
  let resp: Response | null = null;
  const sharedSecret = await Shopify.getSharedSecret();
  try {
    const postData = generateShopifyProduct(user, note);
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

const saveProductOnDb = async (
  store: PahinaStoreRecord,
  note: PahinaNoteRecord,
) => {
  let product: PahinaUserStoreProductRecord | null = null;

  const params: PutItemInput = generateUserStoreProduct(store, note);
  try {
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] put UserStoreProduct', pretty(data));
    product = (data as unknown) as PahinaUserStoreProductRecord;
  } catch (err) {
    console.log('[ERROR] put UserStoreProduct', err);
  }

  return product;
};

const saveShopifyResponseOnDb = async (
  product: PahinaUserStoreProductRecord,
  resp: Response,
) => {
  const { body, headers } = await resp.json();
  let savedProduct: PahinaUserStoreProductRecord | null = null;
  try {
    const params: PutItemInput = await getUpdateInfoFromShopify(product, {
      body,
      headers,
    });
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] save post response UserStoreProduct', pretty(data));
    savedProduct = data as PahinaUserStoreProductRecord;
  } catch (err) {
    console.log('[ERROR] save post response UserStoreProduct', err);
  }

  return savedProduct;
};
