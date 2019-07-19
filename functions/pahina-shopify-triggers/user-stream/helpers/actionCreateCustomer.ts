import { Response } from 'node-fetch';
import { ProcessingError } from '../utils/ProcessingError';
import Shopify from '../connections/Shopify';
import { pretty } from '../utils/simpleUtils';
import { fetchRequiredData } from './fetchRequiredData';
import { generateShopifyCustomer } from './generateShopifyCustomer';

export const createCustomer = async (userRecord: UserRecord) => {
  const postCustomerResp = await sendShopifyPostCustomer(userRecord);
  if (!postCustomerResp) {
    throw new ProcessingError('Failed to post customer to Shopify');
  }
};

const sendShopifyPostCustomer = async (userRecord: UserRecord) => {
  let resp: Response | null = null;
  let cognitoUser: CognitoUser | null = null;
  try {
    ({ cognitoUser } = await fetchRequiredData(userRecord));
  } catch (err) {
    console.log(`[ERROR] failed to retrieve required data`);
  }

  if (!cognitoUser) {
    throw new ProcessingError('cognitoUser is empty');
  }

  try {
    const postData = generateShopifyCustomer(cognitoUser);
    resp = await Shopify.postCreate<{ customer: any }>(postData, 'customers');
    const body = await resp.json();
    const headers = resp.headers.raw();
    console.log(
      '[SUCCESS] create customer on Shopify',
      pretty(headers),
      pretty(body),
    );
    return { body, headers };
  } catch (err) {
    console.log('[ERROR] create customer on Shopify', pretty(err));
    throw err;
  }
};
