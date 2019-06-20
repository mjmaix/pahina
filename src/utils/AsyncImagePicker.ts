import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { Storage } from 'aws-amplify';
import { Platform } from 'react-native';

import { logError, logInfo } from '../utils/reports';
import { getExt } from './getExt';

const fs = FileSystem;

const avatarOptions = {
  base64: false,
};

const defaultStorageConfig: StorageConfig = {
  level: 'private',
  contentType: 'image/jpeg',
  progressCallback: undefined,
};

export class AsyncImagePicker {
  private static loadAssetToBase64 = async (filePath: string) => {
    let sureFilePath = filePath;
    if (Platform.OS === 'ios') {
      logInfo(`Read file: ${filePath}`);
      sureFilePath = filePath.replace('file:/', '');
    }
    try {
      const data = await fs.readAsStringAsync(sureFilePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return new Buffer(data, 'base64');
    } catch (err) {
      logError(err);
      return null;
    }
  };

  public static uploadImage = async (
    imageUri: string,
    storageConfig = defaultStorageConfig,
  ) => {
    if (!imageUri) {
      throw new Error('No image selected');
    }
    const data = await AsyncImagePicker.loadAssetToBase64(imageUri);
    const uploadFileName = `profile_picture.${getExt(imageUri)}`;
    try {
      logInfo(['Uploading', uploadFileName, storageConfig]);
      const result = await Storage.put(uploadFileName, data, storageConfig);
      const s3Key = (result as S3Object).key;
      return s3Key;
    } catch (err) {
      throw err;
    }
  };

  public showImagePicker = async () => {
    return new Promise<ImagePicker.ImagePickerResult>(
      async (resolve, reject) => {
        const response = await ImagePicker.launchImageLibraryAsync(
          avatarOptions,
        );

        resolve(response);
      },
    );
  };
}
