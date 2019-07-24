import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { ListRenderItem, Alert, FlatList } from 'react-native';
import {
  StyledListItem,
  containerStyles,
  ListItemExentendProps,
  StyledButton,
} from '../../components';
import { StyleGuide } from '../../themes';
import { NavigationService } from '../../utils';

interface Props {}
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

const renderItem: ListRenderItem<Address> = ({ item, index }) => {
  const address = item as Address;
  const cleanData: ListItemExentendProps = {
    leftIcon: {
      name: 'location',
      type: 'octicon',
    },
    rightIcon: {
      name: 'edit-2',
      type: 'feather',
      onPress: () => Alert.alert('not yet implemented'),
    },
    // rightSubtitle: 'Edit',
    title: `${address.first_name} ${address.last_name}`,
    subtitle: [
      address.phone,
      `${address.address1}, ${address.address2}, ${address.city}, ${
        address.province
      }`,
      address.default ? `(Default Billing Address)` : undefined,
    ].join('\n'),
    topDivider: true,
  };
  return <StyledListItem key={`${address.id}`} {...cleanData} />;
};

export class AddressesScreen extends Component<Props, State> {
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
          renderItem={renderItem}
        />
      </Fragment>
    );
  }
}
