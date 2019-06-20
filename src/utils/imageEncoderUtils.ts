import { GetObjectOutput } from 'aws-sdk/clients/s3';
import base64 from 'base-64';
import _ from 'lodash';

function encode(data: any) {
  const str = _.reduce(data, (a, b) => a + String.fromCharCode(b), '');
  return base64.encode(str).replace(/.{76}(?=.)/g, '$&\n');
}

function appendDataType(base64Data: string, mime: string) {
  return `data:${mime};base64,${base64Data}`;
}

export const getConvertedToImageUri = (
  obj: GetObjectOutput,
  contentType: string,
) => {
  const base64Data = encode(obj.Body);
  const source = { uri: appendDataType(base64Data, contentType) };
  return source;
};
