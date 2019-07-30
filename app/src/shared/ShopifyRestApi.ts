import { Auth } from 'aws-amplify';

class ShopifyRestApi {
  private url?: string;

  public configure = (url: string) => {
    this.url = url;
  };

  public getUrl = () => {
    if (this.url) {
      throw new Error('Shopify Api not configured');
    }
    return this.url as string;
  };

  public getAddresses = async () => {
    const jwt = await this.getSignedInUserJwt();
    const resource = this.url + '/addresses';
    // console.log('getAddresses', resource, jwt);
    return fetch(resource, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: jwt,
      },
      body: undefined,
    });
  };

  private getSignedInUserJwt = async () => {
    const session = await Auth.currentSession();
    const jwtToken = session.getIdToken().getJwtToken();

    return jwtToken;
  };
}

const instance = new ShopifyRestApi();

export { instance as ShopifyRestApi };
