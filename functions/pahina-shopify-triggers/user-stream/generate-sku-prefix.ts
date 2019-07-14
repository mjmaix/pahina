import short from 'short-uuid';

const skuTranslator = short(
  'ABCDEFHJKMNPQRSTUVWXYZabcdefghjkmnqrstuvwxyz01234567890',
);

export const generateSkuPrefix = () => {
  const skuPrefix = skuTranslator.generate();

  return skuPrefix;
};
