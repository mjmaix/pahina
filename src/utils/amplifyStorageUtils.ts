import { Storage } from 'aws-amplify';

export const asyncGetS3Link = async (s3Key: string, config?: StorageConfig) => {
  const link = await Storage.get(s3Key, config);
  return link;
};
