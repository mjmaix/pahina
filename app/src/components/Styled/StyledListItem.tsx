import styled from 'styled-components/native';
import { ListItem, ListItemProps } from 'react-native-elements';
import { TextStyle } from 'react-native';

export interface ListItemExentendProps extends ListItemProps {
  danger?: boolean;
  center?: boolean;
}

export const StyledListItem = styled(ListItem).attrs<ListItemExentendProps>(
  props => {
    const titleStyle: TextStyle = {
      color: props.danger ? props.theme.colors.error : undefined,
      textAlign: props.center ? 'center' : undefined,
    };
    return {
      titleStyle,
    };
  },
)``;
