import { Container } from 'unstated';
import _ from 'lodash';

import { ShopifyRestAddress } from '../types';
import { ShopifyRestApi } from '../shared/ShopifyRestApi';
import { logError } from '../shared';

export interface AddressesState {
  isReady: boolean;
  addresses?: ShopifyRestAddress[];
  errorMessage?: string | null;
}

const initialState = {
  isReady: false,
  errorMessage: null,
  addresses: [],
};

interface Props {}

class AddressesContainer extends Container<AddressesState> {
  public state: AddressesState = initialState;
  constructor(props: Props) {
    super();
    this.fetchData();
  }

  public fetchData = async () => {
    try {
      const response = await ShopifyRestApi.getAddresses();
      const body = await response.json();
      console.log('addresses', JSON.stringify(response, undefined, 2));
      if (body && body.addresses) {
        const adds = body.addresses;

        const ordered = _.orderBy(adds, ['default', 'id'], ['desc', 'desc']);

        this.setState({ addresses: ordered });
      }
    } catch (err) {
      logError(
        'ShopifyRestApi.getAddresses',
        JSON.stringify(err, undefined, 2),
      );
    }
  };
}

export { AddressesContainer };
