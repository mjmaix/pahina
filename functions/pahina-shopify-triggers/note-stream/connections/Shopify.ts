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
    const { apiVersion, hostname, keyPath, keyMatcher } = this;

    const SsmParams = await AwsSSM.getParams(keyPath);

    const accessToken = SsmParams.Parameters.find(keyMatcher('ApiKey'));
    const password = SsmParams.Parameters.find(keyMatcher('Password'));

    this.url = `https://${accessToken}:${password}@${hostname}/admin/api/${apiVersion}`;
  };

  postProduct = async (data: { product: any }) => {
    if (!this.url) {
      await this.init();
    }
    if (!this.url) {
      throw new ProcessingError('Shopify URL not available');
    }

    return fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  getSharedSecret = async () => {
    const SsmParams = await AwsSSM.getParams(this.keyPath);

    const sharedSecret = SsmParams.Parameters.find(
      this.keyMatcher('SharedSecret'),
    );
    if (!sharedSecret || !sharedSecret.Value) {
      throw new ProcessingError('SharedSecret was provided');
    }

    return sharedSecret.Value;
  };

  keyMatcher = (name: string) => (e: AWS.SSM.Parameter) =>
    e.Name === `${this.keyPath}/${name}`;
}

const instance = new Shopify();

export default instance;
