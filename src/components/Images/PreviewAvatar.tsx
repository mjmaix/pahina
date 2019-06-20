import React, { Fragment } from 'react';
import { ImageProperties, ImageURISource } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

import { AsyncImagePicker } from '../../utils';
import { PreviewS3Image } from './PreviewS3Image';
import { ImagePickerResult } from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export interface PreviewAvatarProps {
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  source?: ImageURISource | undefined;
  errorMessage?: string | undefined | null;
  handleTouched?: (v: boolean) => void;
  isSubmitting?: boolean;
  imageProps?: Partial<ImageProperties>;
  imgKey?: string;
  identityId?: string;
  level?: 'private' | 'protected' | 'public';
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  rounded?: boolean;
  editable?: boolean;
}

// TODO: style errorMessage
export const PreviewAvatar = (props: PreviewAvatarProps) => {
  const {
    source,
    handleChangeImage,
    errorMessage,
    handleTouched,
    isSubmitting,
    imageProps,
    imgKey,
    level,
    size = 'xlarge',
    identityId,
    editable = true,
    rounded = false,
  } = props;

  const icon = {
    name: 'user',
    type: 'feather',
  };

  const ImgComp = imgKey
    ? class extends React.Component {
        public render() {
          return (
            <PreviewS3Image
              imgKey={imgKey}
              level={level || 'protected'}
              identityId={identityId}
            />
          );
        }
      }
    : undefined;
  return (
    <Fragment>
      <Avatar
        ImageComponent={imgKey ? ImgComp : undefined}
        icon={imgKey ? undefined : icon}
        source={imgKey ? undefined : source}
        showEditButton={!isSubmitting && editable}
        rounded={rounded}
        imageProps={imageProps}
        size={size}
        onEditPress={async () => {
          const picker = new AsyncImagePicker();
          const result: ImagePickerResult = await picker.showImagePicker();
          if (result && handleChangeImage) {
            handleChangeImage((result as ImageInfo).uri);
          }
          if (handleTouched) {
            handleTouched(true);
          }
        }}
      />
      {!!errorMessage && <Text>{errorMessage}</Text>}
    </Fragment>
  );
};
