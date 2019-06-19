import { Body, ContentType } from 'aws-sdk/clients/s3';
import React from 'react';
import {
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';

declare module 'aws-amplify-react-native' {
  interface S3ImageProps extends Partial<ImageProps> {
    imgKey: string;
    level?: string;
    resizeMode?: ImageResizeMode;
    body?: Body;
    contentType?: ContentType;
    track?: boolean;
    identityId?: string;
  }

  interface S3ImageState {
    src?: ImageURISource;
  }

  class S3Image extends React.Component<S3ImageProps, S3ImageState> {}
}
