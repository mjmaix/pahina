import _ from 'lodash';
import { MAX_BATCH_UPLOAD } from '../PahinaCase/config';

export class DataPool<T> {
  data: T[];
  batchSize: number;
  ctr: number;
  constructor(data: T[], size = 25) {
    this.data = data;
    this.batchSize = size;
    this.ctr = 0;
  }

  next = () => {
    this.ctr = this.ctr + 1;
    const { batchSize: max_items, data } = this;
    let newB: T[] = [];
    _.times(max_items, () => {
      if (data.length > 0) {
        newB.push(data.pop());
      }
    });

    return { data: newB, ctr: this.ctr };
  };

  hasNext = () => {
    const { data } = this;
    return data.length > 0 && MAX_BATCH_UPLOAD > this.ctr;
  };

  remainingIteration = () => {
    const { data, batchSize: size } = this;
    const mod = data.length % size ? 1 : 0;
    const totalFiles = Math.floor(data.length / size);
    const totalWithMod = totalFiles + mod;
    return MAX_BATCH_UPLOAD < totalWithMod ? MAX_BATCH_UPLOAD : totalWithMod;
  };

  counter = () => {
    return this.ctr;
  };
}
