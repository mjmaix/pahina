import AwsSSM from '../aws/AwsSSM';
import { ProcessingError } from '../utils/ProcessingError';
import { jsonPost, jsonPut, jsonGet, jsonDelete } from '../utils/jsonFetch';
import { pretty } from '../utils';

class ShopifyRest {
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

  post = async <D>(data: D, resource: string) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    const resourceUrl = `${this.url}/${resource}.json`;
    const body = JSON.stringify(data);

    if (this.env !== 'prod') {
      console.log(`[DEBUG] post url`, resourceUrl, pretty(body));
    }

    return jsonPost(resourceUrl, body);
  };

  put = async <D>(data: D, path: string) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    const resourceUrl = `${this.url}/${path}.json`;
    const body = JSON.stringify(data);

    if (this.env !== 'prod') {
      console.log(`[DEBUG] put url`, resourceUrl, pretty(body));
    }

    return jsonPut(resourceUrl, body);
  };

  delete = async (resource: string, resouce_id: string) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    const resourceUrl = `${this.url}/${resource}/${resouce_id}.json`;

    if (this.env !== 'prod') {
      console.log(`[DEBUG] delete url`, resourceUrl);
    }

    return jsonDelete(resourceUrl);
  };

  get = async (path: string, queryString?: string) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    let resourceUrl = `${this.url}/${path}.json`;
    if (queryString) {
      resourceUrl = `${resourceUrl}?${queryString}`;
    }

    if (this.env !== 'prod') {
      console.log(`[DEBUG] get url`, resourceUrl);
    }

    return jsonGet(resourceUrl);
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

const instance = new ShopifyRest();

export default instance;
