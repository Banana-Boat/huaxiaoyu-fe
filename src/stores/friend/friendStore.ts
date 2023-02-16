import {action, makeObservable, observable} from 'mobx';
import {IOpponent} from '~stores/chat/types';

class FriendStore {
  constructor() {
    makeObservable(this, {});
  }
}

export default new FriendStore();
