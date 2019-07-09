class API {
  endpoint: string;
  constructor() {
    const hostname = process.env.SHOPIFY_API_HOSTNAME;
    const apikey = process.env.SHOPIFY_API_KEY;
    const version = process.env.SHOPIFY_API_VERSION;
    const password = process.env.SHOPIFY_API_PWD;
    this.endpoint = `https://${apikey}:${password}@${hostname}/admin/api/${version}/`;
  }
}

const instance = new API();

export default instance;
