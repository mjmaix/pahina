import { PahinaUserRecord, PahinaNoteRecord } from '../types';

import { utcNow } from '../utils/simpleUtils';

export function generateShopifyProduct(
  user: PahinaUserRecord,
  note: PahinaNoteRecord,
) {
  const productType = 'Case Digest';
  const vendor = `${user.givenName.S} ${user.familyName.S}`;
  const caseCode = note.caseCode.S;
  const caseTitle = note.caseTitle.S;
  const caseLink = note.caseLink.S;
  const caseDate = note.caseDate.S;
  let html = '';
  html += `<p>${caseTitle}</p>`;
  html += `<p>${caseCode}</p>`;
  html += `<p>${caseDate}</p>`;
  html += `<p>${caseLink}</p>`;
  html += `<p>${note.promotional.S}</p>`;
  return {
    product: {
      title: `${caseCode} ${caseTitle} - ${productType} written by ${vendor}`,
      body_html: html,
      vendor: vendor,
      product_type: productType,
      tags: [caseCode, vendor],
      published_scope: 'global',
      published_at: utcNow(),
      variants: [
        {
          option1: 'Paid',
          price: '100.00',
          inventory_policy: 'continue',
          inventory_quantity: 0,
          requires_shipping: false,
        },
        {
          option1: 'Free',
          price: '0.00',
          inventory_policy: 'deny',
          inventory_quantity: 5,
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
