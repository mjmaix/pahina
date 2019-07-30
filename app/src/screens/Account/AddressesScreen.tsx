import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Subscribe } from 'unstated';
import {
  StyledListItem,
  ListItemExentendProps,
  StyledButton,
  BillingAddress,
} from '../../components';
import { StyleGuide } from '../../themes';
import { ListRenderItem, FlatList } from 'react-native';
import { withTheme, ThemedComponentProps } from 'styled-components';
import { NavigationService } from '../../utils';
import { ShopifyRestAddress } from '../../types';
import { AddressesContainer } from '../../unstated';

type Address = ShopifyRestAddress;
type Props = ThemedComponentProps;
interface State {
  addresses: ShopifyRestAddress[];
}

class AddressesScreen extends Component<Props, State> {
  public addressesContainer: AddressesContainer;
  constructor(props: Props) {
    super(props);
    this.addressesContainer = new AddressesContainer({});
  }

  public componentDidMount() {
    this.addressesContainer.fetchData();
  }
  public render() {
    return (
      <Subscribe to={[this.addressesContainer]}>
        {addCntr => {
          const { isReady, addresses } = addCntr.state;
          return (
            <Fragment>
              <StyledButton
                label={'Add billing address'}
                onPress={() => NavigationService.navigate('Address')}
                style={{
                  margin: StyleGuide.gap.big,
                }}
              />
              {isReady && !_.isEmpty(addresses) && (
                <FlatList<Address>
                  keyExtractor={(item: Address, i: number) =>
                    (item.id || i).toString()
                  }
                  data={addresses}
                  renderItem={this.renderItem}
                />
              )}
              {isReady && _.isEmpty(addresses) && null}
            </Fragment>
          );
        }}
      </Subscribe>
    );
  }

  private renderItem: ListRenderItem<Address> = ({ item, index }) => {
    const {
      theme: { colors },
    } = this.props;

    const address = item as Address;
    const cleanData: ListItemExentendProps = {
      leftIcon: {
        name: 'location',
        type: 'octicon',
        color: item.default ? colors.primarydark : colors.primarylight,
      },
      rightIcon: {
        name: 'edit-2',
        type: 'feather',
        onPress: () => NavigationService.navigate('Address', { address: item }),
        color: item.default ? colors.primarydark : colors.primarylight,
      },
      title: `${address.first_name} ${address.last_name}`,
      subtitle: <BillingAddress address={address} />,
      // subtitleStyle: item.default ? { color: 'green' } : undefined,
      topDivider: true,
    };
    return <StyledListItem key={`${address.id}`} {...cleanData} />;
  };
}

const ThemedAddressesScreen = withTheme(AddressesScreen);

export { ThemedAddressesScreen as AddressesScreen };
