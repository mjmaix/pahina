class GraphQL {
  endpoint: string;
  constructor() {
    const hostname = process.env.SHOPIFY_HOSTNAME;
    const apikey = process.env.SHOPIFY_API_KEY;
    const password = process.env.SHOPIFY_API_PWD;
    this.endpoint = `https://${apikey}:${password}@${hostname}/admin/api/2019-07/`;
  }
}

const instance = new GraphQL();

export default instance;
