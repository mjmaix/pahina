import { isoNow } from '../../shared/utils/simpleUtils';

export function generateShopifyProduct(
  user: CognitoUser,
  note: NoteRecord,
  caseRec: CaseRecord,
) {
  const productType = 'Case Digest';
  const vendor = `${user.userAttributes.given_name.Value} ${
    user.userAttributes.family_name.Value
  }`;
  const caseCode = caseRec.code.S;
  const caseTitle = caseRec.title.S;
  const caseLink = caseRec.link.S;
  const caseDate = caseRec.date.S;
  let html = '';
  html += `<p>${caseTitle}</p>`;
  html += `<p>${caseCode}</p>`;
  html += `<p>${caseDate}</p>`;
  html += `<p>${caseLink}</p>`;
  html += `<p>${note.promotional.S}</p>`;
  return {
    product: {
      title: `${productType} by ${vendor}, ${caseCode} - ${caseDate}`,
      body_html: html,
      vendor: vendor,
      product_type: productType,
      tags: [caseCode, vendor],
      published_scope: 'global',
      published_at: isoNow(),
      variants: [
        {
          option1: 'Free',
          price: '0.00',
          compare_at_price: '100.00',
          inventory_management: 'shopify',
          inventory_policy: 'deny',
          inventory_quantity: 5,
          requires_shipping: false,
          taxable: false,
        },
        {
          option1: 'Paid',
          price: '100.00',
          inventory_policy: 'continue',
          inventory_quantity: 0,
          requires_shipping: false,
        },
      ],
      options: [
        {
          name: 'Pricing',
          values: ['paid', 'free'],
        },
      ],
      metafields: [
        {
          namespace: 'ProductLinks',
          description: 'Note ID',
          key: 'noteId',
          value: note.id.S,
          value_type: 'string',
        },
        {
          namespace: 'ProductLinks',
          description: 'Author ID',
          key: 'authorId',
          value: note.authorId.S,
          value_type: 'string',
        },
        {
          namespace: 'ProductLinks',
          description: 'Note Case ID',
          key: 'pahinaNoteCaseId',
          value: note.caseId.S,
          value_type: 'string',
        },
        {
          namespace: 'ProductDetails',
          description: 'Author Name',
          key: 'authorName',
          value: vendor,
          value_type: 'string',
        },
        {
          namespace: 'ProductDetails',
          description: 'Case Title',
          key: 'caseTitle',
          value: caseTitle,
          value_type: 'string',
        },
        {
          namespace: 'ProductDetails',
          description: 'Case Code',
          key: 'caseCode',
          value: caseCode,
          value_type: 'string',
        },
        {
          namespace: 'ProductDetails',
          description: 'date',
          key: 'caseDate',
          value: caseDate,
          value_type: 'string',
        },
        {
          namespace: 'ProductDetails',
          description: 'Case link',
          key: 'caseLink',
          value: caseLink,
          value_type: 'string',
        },
      ],
    },
  };
}
