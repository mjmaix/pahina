import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { ListRenderItem, FlatList, Text } from 'react-native';
import {
  StyledListItem,
  containerStyles,
  ListItemExentendProps,
  StyledButton,
} from '../../components';
import { StyleGuide } from '../../themes';
import { NavigationService } from '../../utils';
import { ThemedComponentProps, withTheme } from 'styled-components';

type Props = ThemedComponentProps;
interface State {}

const sampleData = {
  addresses: [
    {
      id: 2275593388141,
      customer_id: 2125981483117,
      first_name: 'Free',
      last_name: 'Test',
      company: '',
      address1: '447F Masilang Street',
      address2: 'Barangay Pineda',
      city: 'Pasig City',
      province: 'Metro Manila',
      country: 'Philippines',
      zip: '1603',
      phone: '09175967544',
      name: 'Free Test',
      province_code: null,
      country_code: 'PH',
      country_name: 'Philippines',
      default: false,
    },
    {
      id: 2275595124845,
      customer_id: 2125981483117,
      first_name: 'Free',
      last_name: 'Test',
      company: '',
      address1: 'Test2 (editted) 447F Masilang Street',
      address2: 'Barangay Pineda',
      city: 'Pasig City',
      province: 'Metro Manila',
      country: 'Philippines',
      zip: '1603',
      phone: '09175967544',
      name: 'Free Test',
      province_code: null,
      country_code: 'PH',
      country_name: 'Philippines',
      default: true,
    },
  ],
};

type Address = typeof sampleData.addresses[0];

class AddressesScreen extends Component<Props, State> {
  public render() {
    const sortedAddresses = _.orderBy(
      sampleData.addresses,
      ['default', 'id'],
      ['desc', 'desc'],
    );

    return (
      <Fragment>
        <Fragment>
          <StyledButton
            label={'Add address'}
            onPress={() => NavigationService.navigate('Address')}
            style={{
              margin: StyleGuide.gap.big,
            }}
          />
        </Fragment>
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
      subtitle: (
        <Text
          style={{
            color: colors.grey3,
            flexDirection: 'column',
          }}
        >
          {!!address.phone && <Text>{address.phone + '\n'}</Text>}
          <Text>{`${address.address1}, ${address.address2}, ${address.city}, ${
            address.province
          }, ${address.country_code}`}</Text>
          {!!address.default && (
            <Text
              style={{ color: colors.success, fontWeight: '500' }}
            >{`\n(Default Billing Address)`}</Text>
          )}
        </Text>
      ),
      // subtitleStyle: item.default ? { color: 'green' } : undefined,
      topDivider: true,
    };
    return <StyledListItem key={`${address.id}`} {...cleanData} />;
  };
}

const ThemedAddressesScreen = withTheme(AddressesScreen);

export { ThemedAddressesScreen as AddressesScreen };
