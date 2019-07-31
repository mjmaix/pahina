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

interface Props {
  preload?: boolean;
}

class AddressesContainer extends Container<AddressesState> {
  public state: AddressesState = initialState;
  constructor(props?: Props) {
    super();
    if (props && props.preload) {
      this.fetchData();
    }
  }

  public fetchData = async () => {
    let newState: AddressesState = { isReady: true };
    try {
      await this.setState({ isReady: false }, async () => {
        const response = await ShopifyRestApi.getAddresses();
        const body = await response.json();
        if (body && body.addresses) {
          const adds = body.addresses;
          const ordered = _.orderBy(adds, ['default', 'id'], ['desc', 'desc']);

          newState = { ...newState, addresses: ordered };
        }
      });
      return this.state.addresses;
    } catch (err) {
      logError(
        'ShopifyRestApi.getAddresses',
        JSON.stringify(err, undefined, 2),
      );
    } finally {
      this.setState(newState);
    }
    return null;
  };
}
const instance = new AddressesContainer({});

export { AddressesContainer, instance as AddressesContainerInstance };
