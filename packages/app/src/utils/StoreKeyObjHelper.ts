import keyBy from 'lodash/keyBy';
import omit from 'lodash/keyBy';

interface ItemType {
  [k: string]: any;
  [k: number]: any;
}

interface StoreInfoType<StoreDataT, ItemT> {
  data: StoreDataT;
  isReady?: boolean;
  update?: (k: ItemT[]) => void;
}

interface StoreDataType<ItemT> {
  [k: string]: ItemT;
}

// TODO: ideal for unit test
export class StoreKeyObjHelper<
  ItemT extends ItemType,
  StoreDataT extends StoreDataType<ItemT> = StoreDataType<ItemT>,
  StoreInfoT extends StoreInfoType<StoreDataT, ItemT> = StoreInfoType<
    StoreDataT,
    ItemT
  >
> {
  public keyByField: string;

  constructor(keyByField = 'id') {
    this.keyByField = keyByField;
  }

  public appendItem = (existing: StoreInfoT, item: ItemT) => {
    const newStoreDataInfo: StoreInfoT = {
      ...existing,
      data: {
        ...existing.data,
        [`${item[this.keyByField]}` as string]: item,
      },
    };

    return newStoreDataInfo;
  };

  public appendList = (existing: StoreInfoT, items: ItemT[]) => {
    const keyedItems = keyBy(items, this.keyByField);
    const newStoreDataInfo: StoreInfoT = {
      ...existing,
      data: {
        ...existing.data,
        ...keyedItems,
      },
    };

    return newStoreDataInfo;
  };

  public removeItem = (existing: StoreInfoT, item: ItemT) => {
    const key = `${item[this.keyByField]}`;

    const newStoreDataInfo: StoreInfoT = {
      ...existing,
      data: omit(existing.data, key),
    };

    return newStoreDataInfo;
  };

  public setReady = (existing: StoreInfoT, value: boolean) => {
    const newStoreDataInfo: StoreInfoT = {
      ...existing,
      isReady: value,
    };

    return newStoreDataInfo;
  };

  public setUpdate = (existing: StoreInfoT, update: (k: ItemT[]) => void) => {
    const newStoreDataInfo: StoreInfoT = {
      ...existing,
      update,
    };

    return newStoreDataInfo;
  };
}
