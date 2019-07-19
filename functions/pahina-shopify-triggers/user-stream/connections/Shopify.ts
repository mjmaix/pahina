import fetch from 'node-fetch';
import AwsSSM from './AwsSSM';
import { ProcessingError } from '../utils/ProcessingError';

class Shopify {
  url?: string;
  hostname: string;
  apiVersion: string;
  env: string;
  keyPath: string;
  constructor() {
    if (!process.env.SHOPIFY_API_HOSTNAME) {
      throw new ProcessingError('SHOPIFY_API_HOSTNAME param not provided');
    }
    if (!process.env.SHOPIFY_API_VERSION) {
      throw new ProcessingError('SHOPIFY_API_VERSION param not provided');
    }
    if (!process.env.ENV) {
      throw new ProcessingError('ENV param not provided');
    }
    this.env = process.env.ENV;

    this.apiVersion = process.env.SHOPIFY_API_VERSION;
    this.hostname = process.env.SHOPIFY_API_HOSTNAME;
    this.keyPath = `/${this.hostname}/${this.env}`;
  }

  init = async () => {
    const { apiVersion, hostname, keyPath } = this;
    await AwsSSM.fetchPath(keyPath); // pre fetch path

    const accessToken = await AwsSSM.getParams(`${keyPath}/ApiKey`);
    const password = await AwsSSM.getParams(`${keyPath}/Password`);

    this.url = `https://${accessToken}:${password}@${hostname}/admin/api/${apiVersion}`;
  };

  postCreate = async <D>(data: D, resource: string) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    const resourceUrl = `${this.url}/${resource}.json`;
    const body = JSON.stringify(data);

    return jsonPost(resourceUrl, body);
  };

  getSharedSecret = async () => {
    if (!this.url) {
      await this.init();
    }
    const sharedSecret = await AwsSSM.getParams(`${this.keyPath}/SharedSecret`);

    if (!sharedSecret) {
      throw new ProcessingError('SharedSecret was not provided');
    }

    return sharedSecret.toString();
  };
}

const instance = new Shopify();

export default instance;

function jsonPost(resourceUrl: string, body: string) {
  console.log(
    `[INFO] post body URL: ${process.env.ENV !== 'prod' ? resourceUrl : ''}`,
    body,
  );
  return fetch(resourceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
