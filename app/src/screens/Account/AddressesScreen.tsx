import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import {
  StyledListItem,
  containerStyles,
  ListItemExentendProps,
  StyledButton,
  BillingAddress,
} from '../../components';
import { StyleGuide } from '../../themes';
import { NavigationService } from '../../utils';
import { withTheme, ThemedComponentProps } from 'styled-components';
import sampleData from '../../api-helpers/sampleaddresses.json';
import { ListRenderItem, FlatList } from 'react-native';
import { ShopifyRestAddress } from '../../types';

type Props = ThemedComponentProps;
interface State {}

type Address = ShopifyRestAddress;

class AddressesScreen extends Component<Props, State> {
  public render() {
    const sortedAddresses = _.orderBy(
      sampleData.addresses,
      ['default', 'id'],
      ['desc', 'desc'],
    );

    return (
      <Fragment>
        <StyledButton
          label={'Add address'}
          onPress={() => NavigationService.navigate('Address')}
          style={{
            margin: StyleGuide.gap.big,
          }}
        />
        <FlatList<Address>
          style={containerStyles.darken}
          keyExtractor={(item: Address, i: number) => (item.id || i).toString()}
          data={sortedAddresses}
          renderItem={this.renderItem}
        />
      </Fragment>
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
