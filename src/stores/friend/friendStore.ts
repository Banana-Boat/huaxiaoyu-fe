import {action, makeObservable, observable} from 'mobx';
import {IFriend} from './types';

class FriendStore {
  constructor() {
    makeObservable(this, {
      friendList: observable,
      updateFriendList: action,
      deleteFriend: action,
    });
  }

  friendList: IFriend[] = [];

  updateFriendList(friendList: IFriend[]) {
    this.friendList = [...friendList];
  }

  deleteFriend(opponentId: number) {
    this.friendList = this.friendList.filter(item => item.id !== opponentId);
  }
}

export default new FriendStore();
