import {PermissionsAndroid} from 'react-native';

export const requestMicrophone = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Permissions for record audio',
        message: 'Give permission to your device to record audio',
        buttonPositive: 'ok',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission granted');
    } else {
      console.log('permission denied');
      return;
    }
  } catch (err) {
    console.warn(err);
    return;
  }
};

export const checkMicrophone = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  );
  return result;
};
