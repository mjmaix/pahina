import { Auth } from 'aws-amplify';
import { ShopifyRestAddress } from '../types';

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
    const resource = this.url + '/addresses/';

    const headers = await this.getHeader();
    return fetch(resource, {
      method: 'GET',
      headers,
    });
  };

  public createAddress = async (form: ShopifyRestAddress) => {
    const resource = this.url + '/addresses/';

    const body = {
      address: {
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        province: form.province,
        country: form.country,
        zip: form.zip,
      },
    };

    const headers = await this.getHeader();
    return fetch(resource, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  };

  public makeDefaultAddress = async (form: ShopifyRestAddress) => {
    const resource = this.url + '/addresses/' + form.id + '/default';

    const headers = await this.getHeader();

    return fetch(resource, {
      method: 'PUT',
      headers,
      body: JSON.stringify({}),
    });
  };

  public updateAddress = async (form: ShopifyRestAddress) => {
    const resource = this.url + '/addresses/' + form.id;

    const body = {
      address: {
        id: form.id,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        province: form.province,
        country: form.country,
        zip: form.zip,
      },
    };

    const headers = await this.getHeader();
    return fetch(resource, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
  };
  public deleteAddress = async (form: ShopifyRestAddress) => {
    const resource = this.url + '/addresses/' + form.id;

    const headers = await this.getHeader();

    return fetch(resource, {
      method: 'DELETE',
      headers,
    });
  };

  private getHeader = async () => {
    const jwt = await this.getSignedInUserJwt();

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: jwt,
    };
  };

  private getSignedInUserJwt = async () => {
    const session = await Auth.currentSession();
    const jwtToken = session.getIdToken().getJwtToken();

    return jwtToken;
  };
}

const instance = new ShopifyRestApi();

export { instance as ShopifyRestApi };
