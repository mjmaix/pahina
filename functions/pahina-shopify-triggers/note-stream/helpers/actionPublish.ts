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

  let product: PahinaUserStoreProductRecord | null = null;
  const sharedSecret = await Shopify.getSharedSecret();

  const params: PutItemInput = generateUserStoreProduct(store, note);
  try {
    const data: PutItemOutput = await AwsDynamoDB.putItem(params);
    console.log('[SUCCESS] put UserStoreProduct', pretty(data));
    product = (data as unknown) as PahinaUserStoreProductRecord;
  } catch (err) {
    console.log('[ERROR] put UserStoreProduct', err);
  }

  if (!product) {
    throw new ProcessingError('Failed to insert/retrieve UserStoreProduct');
  }
  let digitalSig;
  let shopifyHmac256;
  try {
    const postData = generateShopifyProduct(user, note);
    digitalSig = hmacEncrypt(sharedSecret, JSON.stringify(postData));
    const postResponse = await Shopify.postProduct(postData);
    shopifyHmac256 = postResponse.headers['X-Shopify-Hmac-SHA256'];
    console.log('[SUCCESS] create product on Shopify', pretty(postResponse));
  } catch (err) {
    console.log('[ERROR] create product on Shopify', err);
  }

  if (shopifyHmac256 !== digitalSig) {
    throw new ProcessingError(
      `[ERROR] digital signature ${digitalSig} !== ${shopifyHmac256}`,
    );
  }
};
