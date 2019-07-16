import short from 'short-uuid';

const skuTranslator = short(
  'ABCDEFHJKMNPQRSTUVWXYZabcdefghjkmnqrstuvwxyz023456789',
);

export const generateSkuPrefix = () => {
  const skuPrefix = skuTranslator.generate();

  return skuPrefix;
};
