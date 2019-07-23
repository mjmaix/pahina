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
   * API Gateway
   */

  interface AuthorizerClaims {
    sub: string;
    'cognito:groups': string;
    email_verified: string;
    iss: string;
    phone_number_verified: 'false';
    'cognito:username': string;
    given_name: string;
    aud: string;
    event_id: string;
    token_use: string;
    auth_time: string;
    exp: string;
    iat: string;
    family_name: string;
    email: string;
  }
  /**
   * Shopify
   */

  interface ShopifyCustomer {
    id: number;
    email: string;
    accepts_marketing: false;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    orders_count: number;
    state: string;
    total_spent: string;
    last_order_id: null;
    note: null;
    verified_email: true;
    multipass_identifier: null;
    tax_exempt: false;
    phone: null;
    tags: string;
    last_order_name: null;
    currency: string;
    addresses: [];
    accepts_marketing_updated_at: string;
    marketing_opt_in_level: null;
    tax_exemptions: [];
    admin_graphql_api_id: string;
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

  interface ShopifyMailingAddressInput {
    id?: number;
    customer_id: number;
    first_name?: string;
    last_name?: string;
    company?: string;
    address1: string;
    address2: string;
    city?: string;
    province?: string;
    country?: string;
    zip?: string;
    phone?: string;
    province_code?: string;
    country_code?: string;
    country_name?: string;
    default: boolean;
  }

  interface ShopifyCustomerInput {
    customer: {
      first_name?: String;
      last_name?: String;
      email: String;
      phone?: String;
      verified_email?: boolean;
      addresses?: [ShopifyMailingAddressInput];
    };
  }
}
