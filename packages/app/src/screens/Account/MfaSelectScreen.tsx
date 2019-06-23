import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, NavigationScreenProps } from 'react-navigation';

import { handlePressVerifyContact } from '../../stores';

import {
  NavigationService,
  alertConfirm,
  alertFail,
  alertOk,
} from '../../utils';
import { MfaChallengeType } from '@pahina/core/types';
import { ProfileModel } from '@pahina/core/src/models';
import {
  handleGetPreferredMfa,
  handleCheckContactVerified,
  handleSetMfa,
} from '@pahina/core/src/actions';

type Props = NavigationScreenProps;
interface State {
  isReady: boolean;
  preferredMfa: MfaChallengeType;
  qrCode?: string;
  userAttrs?: typeof ProfileModel;
}

const buttonLabels: string[] = ['Off', 'App']; // TODO: include 'Sms' once AWS supports email + phone_number verification codes
const buttonMap: MfaChallengeType[] = [
  'NOMFA',
  'SOFTWARE_TOKEN_MFA',
  // 'SMS_MFA',
]; // 'SMS'

class MfaSelectScreen extends React.Component<Props, State> {
  public readonly state = {
    isReady: false,
    preferredMfa: 'NOMFA' as MfaChallengeType,
    qrCode: undefined,
    userAttrs: ProfileModel,
  };

  public componentDidMount() {
    handleGetPreferredMfa().then((prefMfa: MfaChallengeType) => {
      this.setState({ isReady: true, preferredMfa: prefMfa });
    });
  }

  public renderItem: ListRenderItem<any> = ({ item, index }) => (
    <ListItem key={index} {...item} />
  );

  private onSelectIndex = async (selectedIndex: number) => {
    try {
      const sel = buttonMap[selectedIndex];
      const pref = this.state.preferredMfa; // NOTE: re-click disabled, workaround for disableStyle as gray
      if (sel === 'SOFTWARE_TOKEN_MFA' && 'SOFTWARE_TOKEN_MFA' !== pref) {
        const isEmailVerified = await handleCheckContactVerified('email');
        if (isEmailVerified) {
          this.handlePressSoftwareTokenMfa();
        } else {
          alertOk(() => handlePressVerifyContact('email'), {
            title: 'Needs verified email',
            message: 'Proceed to verify email screen to request code.',
          });
        }
      } else if (buttonMap[selectedIndex] === 'SMS_MFA' && 'SMS_MFA' !== pref) {
        const isMobileVerified = await handleCheckContactVerified(
          'phone_number',
        );
        if (isMobileVerified) {
          this.handlePressSmsMfa();
        } else {
          alertOk(() => handlePressVerifyContact('email'), {
            title: 'Needs verified mobile',
            message: 'Proceed to verify mobile screen to request code.',
          });
        }
      } else {
        this.handlePressNoMfa();
      }
    } catch (err) {
      alertFail(() => null, err);
    }
  };

  private handlePressNoMfa() {
    alertConfirm(
      async () => {
        // FIXME: does not trigger challenge code https://github.com/aws-amplify/amplify-js/issues/804
        const data = await handleSetMfa('NOMFA');
        this.setState({ preferredMfa: 'NOMFA' });
      },
      {
        cancelable: true,
        message: 'Turn-off MFA',
      },
    );
  }

  private handlePressSmsMfa() {
    alertConfirm(
      () => {
        NavigationService.navigate('MfaSms');
      },
      {
        cancelable: true,
        message: 'Setup SMS based password MFA.',
      },
    );
  }

  private handlePressSoftwareTokenMfa() {
    alertConfirm(
      () => {
        NavigationService.navigate('MfaTotp');
      },
      {
        cancelable: true,
        message: 'Setup App based MFA.',
      },
    );
  }

  public render() {
    const { isReady, preferredMfa } = this.state;
    const list = [
      {
        title: 'Select MFA type',
        buttonGroup: {
          disabled: !isReady,
          buttons: buttonLabels,
          onPress: this.onSelectIndex,
          selectedIndex: buttonMap.indexOf(preferredMfa),
        },
        bottomDivider: true,
      },
    ];
    return (
      <FlatList<any>
        keyExtractor={(item, i: number) => i.toString()}
        data={list}
        renderItem={this.renderItem}
        refreshing={!isReady}
        scrollEnabled={false}
      />
    );
  }
}

export { MfaSelectScreen };
