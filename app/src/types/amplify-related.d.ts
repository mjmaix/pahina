export interface S3Object {
  key: string;
}

/**
 * AWS Storage
 */
export interface StorageConfig {
  level: 'private' | 'protected' | 'public';
  contentType?: string;
  progressCallback?: (param: { loaded: number; total: number }) => void;
  identityId?: string;
  track?: boolean;
}
