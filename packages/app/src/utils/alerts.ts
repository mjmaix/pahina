import { Alert } from 'react-native';

interface AlertOptions {
  title?: string;
  message?: string;
  cancelable?: boolean;
}

export const alertClose = (cb: () => void, opts: AlertOptions = {}) => {
  Alert.alert(
    'Leave current screen?',
    opts.message || 'Changes you made will be lost.',
    [
      {
        text: 'Close',
        style: 'destructive',
        onPress: cb,
      },
      {
        text: 'Stay',
        style: 'cancel',
      },
    ],
    { cancelable: opts.cancelable },
  );
};

export const alertConfirm = (cb: () => void, opts: AlertOptions = {}) => {
  Alert.alert(
    opts.title || 'Are you sure?',
    opts.message,
    [
      {
        text: 'Yes',
        onPress: cb,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ],
    { cancelable: opts.cancelable },
  );
};

export const alertOk = (cb: () => void, opts: AlertOptions = {}) => {
  Alert.alert(
    opts.title || 'Success',
    opts.message,
    [
      {
        text: 'OK',
        onPress: cb,
      },
    ],
    { cancelable: opts.cancelable },
  );
};

export const alertFail = (
  cb: () => void,
  err: Error | any,
  opts: AlertOptions = {},
) => {
  const okAction = [
    {
      text: 'OK',
      onPress: cb,
    },
  ];
  Alert.alert(
    opts.title || 'Oops, failed',
    opts.message || 'Something went wrong. Check the form for more details.',
    cb ? okAction : undefined,
  );
};
