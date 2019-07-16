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

interface ShopifyPostProductVariantResponse {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: 'continue' | 'deny';
  compare_at_price: null;
  fulfillment_service: 'manual';
  inventory_management: null;
  option1: string;
  option2: null;
  option3: null;
  created_at: string;
  updated_at: string;
  taxable: true;
  barcode: null;
  grams: number;
  image_id: null;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: false;
  admin_graphql_api_id: string;
}

interface ShopifyPostProductOptionResponse {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

interface ShopifyPostProductResponse {
  product: {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at: string;
    handle: string;
    updated_at: string;
    published_at: string;
    template_suffix: string | null;
    tags: string;
    published_scope: 'global' | 'web';
    admin_graphql_api_id: string;
    variants: ShopifyPostProductVariantResponse[];
    options: ShopifyPostProductOptionResponse[];
    images: [];
    image: string | null;
  };
}
