import { DynamoDB } from 'aws-sdk';

type AttributeValue = DynamoDB.AttributeValue;
type PutItemInput = DynamoDB.Types.PutItemInput;
type PutItemOutput = DynamoDB.Types.PutItemOutput;
type BatchGetItemOutput = DynamoDB.Types.BatchGetItemOutput;
type BatchGetItemInput = DynamoDB.Types.BatchGetItemInput;

export enum PahinaNoteStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  PUBLISHED_EDITED = 'PUBLISHED_EDITED',
  UNLISTED = 'UNLISTED',
}

// enum PahinaPriceLevel {
//   L_0 = 'L_0',
//   L_50 = 'L_50',
//   L_100 = 'L_100',
//   L_150 = 'L_150',
//   L_200 = 'L_200',
//   L_250 = 'L_250',
//   L_300 = 'L_300',
//   L_350 = 'L_350',
//   L_400 = 'L_400',
//   L_450 = 'L_450',
//   L_500 = 'L_500',
// }

interface PahinaNoteRecord {
  __typename: AttributeValue;
  id: AttributeValue;
  authorId: AttributeValue;
  skuPrefix: AttributeValue;
  caseId: AttributeValue;
  promotional: AttributeValue;
  createdAt: AttributeValue;
  updatedAt: AttributeValue;
  status: AttributeValue;
  priceLevel: AttributeValue;
  value: AttributeValue;
  caseTitle: AttributeValue;
  caseCode: AttributeValue;
  caseDate: AttributeValue;
  caseLink: AttributeValue;
}

interface PahinaStoreRecord {
  __typename: AttributeValue;
  id: AttributeValue;
  pahinaNoteAuthorId: AttributeValue;
  pahinaNoteCaseId: AttributeValue;
  promotional: AttributeValue;
  createdAt: AttributeValue;
  updatedAt: AttributeValue;
  status: AttributeValue;
  priceLevel: AttributeValue;
  value: AttributeValue;
}

interface PahinaUserRecord {
  __typename: AttributeValue;
  id: AttributeValue;
  givenName: AttributeValue;
  familyName: AttributeValue;
  email: AttributeValue;
  picture: AttributeValue;
}

interface PahinaUserStoreProductRecord {
  __typename: AttributeValue;
  id: AttributeValue;
  storeId: AttributeValue;
  ownerId: AttributeValue;
  shopifyProductId: AttributeValue;
  shopifyShopId: AttributeValue;
  onlineStoreUrl: AttributeValue;
  onlineStorePreviewUrl: AttributeValue;
  handle: AttributeValue;
  status: AttributeValue;
  rawResponse: String;
  createdAt: AttributeValue;
  updatedAt: AttributeValue;
  digitalSignature: AttributeValue;
}

export enum PahinaStoreProductStatus {
  CREATED = 'CREATED',
  SENT = 'SENT',
  FAILED = 'FAILED',
}
