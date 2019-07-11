class GraphQL {
  endpoint: string;
  constructor() {
    const hostname = process.env.SHOPIFY_API_HOSTNAME;
    // const apikey = process.env.SHOPIFY_API_KEY;
    // const password = process.env.SHOPIFY_API_PWD;
    this.endpoint = `https://${hostname}/admin/api/graphql.json`;
  }
}

const instance = new GraphQL();

export default instance;
