import {action, makeObservable, observable} from 'mobx';
import {IRecord} from './types';

class RecordStore {
  constructor() {
    makeObservable(this, {
      recordList: observable,
      updateRecordList: action,
    });
  }

  recordList: IRecord[] = [];

  updateRecordList(recordList: IRecord[]) {
    this.recordList = [...recordList];
  }
}

export default new RecordStore();
