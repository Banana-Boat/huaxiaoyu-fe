import {action, makeObservable, observable} from 'mobx';
import {IFriend} from './types';

class FriendStore {
  constructor() {
    makeObservable(this, {
      friendList: observable,
      updateFriendList: action,
    });
  }

  friendList: IFriend[] = [];

  updateFriendList(friendList: IFriend[]) {
    this.friendList = [...friendList];
  }
}

export default new FriendStore();
