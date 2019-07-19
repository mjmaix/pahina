import { DynamoDB, CognitoIdentityServiceProvider } from 'aws-sdk';

declare global {
  /**
   * DynamoDB
   */
  type AttributeValue = DynamoDB.AttributeValue;
  type PutItemInput = DynamoDB.Types.PutItemInput;
  type PutItemOutput = DynamoDB.Types.PutItemOutput;
  type UpdateItemInput = DynamoDB.Types.UpdateItemInput;
  type UpdateItemOutput = DynamoDB.Types.UpdateItemOutput;
  type BatchGetItemOutput = DynamoDB.Types.BatchGetItemOutput;
  type BatchGetItemInput = DynamoDB.Types.BatchGetItemInput;
  type GetItemInput = DynamoDB.Types.GetItemInput;
  type GetItemOutput = DynamoDB.Types.GetItemOutput;
  type QueryInput = DynamoDB.Types.QueryInput;
  type QueryOutput = DynamoDB.Types.QueryOutput;

  interface NoteRecord {
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
  }

  interface PahinaStoreRecord {
    __typename: AttributeValue;
    id: AttributeValue;
    ownerId: AttributeValue;
  }

  interface UserRecord {
    __typename: AttributeValue;
    id: AttributeValue;
  }

  interface ProductRecord {
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

  interface CaseRecord {
    id: AttributeValue;
    title: AttributeValue;
    code: AttributeValue;
    date: AttributeValue;
    link: AttributeValue;
    createdAt: AttributeValue;
    updatedAt: AttributeValue;
  }

  /**
   * Cognito Identity
   */

  type AdminGetUserRequest = CognitoIdentityServiceProvider.Types.AdminGetUserRequest;
  type AdminGetUserResponse = CognitoIdentityServiceProvider.Types.AdminGetUserResponse;
  type AttributeType = CognitoIdentityServiceProvider.Types.AttributeType;
  type UserStatusType = CognitoIdentityServiceProvider.Types.UserStatusType;

  interface CognitoUser extends AdminGetUserResponse {
    userAttributes: CognitoUserAttrs;
  }
  interface CognitoUserAttrs {
    sub: AttributeType;
    email: AttributeType;
    picture: AttributeType;
    family_name: AttributeType;
    given_name: AttributeType;
    phone?: AttributeType;
  }
  /**
   * Shopify
   */

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
}
