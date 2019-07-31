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
import { AddressesContainerInstance } from '../../unstated';
import { NavigationScreenProps } from 'react-navigation';

type Address = ShopifyRestAddress;
type Props = ThemedComponentProps & NavigationScreenProps;
interface State {
  addresses: ShopifyRestAddress[];
}

const addressesContainer = AddressesContainerInstance;

class AddressesScreen extends Component<Props, State> {
  public componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('didFocus', () => addressesContainer.fetchData());
  }
  public render() {
    return (
      <Subscribe to={[addressesContainer]}>
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
              <FlatList<Address>
                keyExtractor={(item: Address, i: number) =>
                  (item.id || i).toString()
                }
                data={addresses}
                renderItem={this.renderItem}
                refreshing={!isReady}
                onRefresh={() => {
                  addressesContainer.fetchData();
                }}
              />
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
