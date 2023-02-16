import {Toast} from 'native-base';
import {Platform} from 'react-native';
import userStore from '~stores/user/userStore';
import chatStore from './chatStore';
import {cancelMessage} from './constants';
import {
  ChatStateType,
  FriendApplyResultType,
  IDataOfFriendApplyEvent,
  IDataOfFriendReplyEvent,
  IDataOfMessageEvent,
  IDataOfStartChatEvent,
} from './types';

export class ChatSocket {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(
      `ws://82.157.247.7:9092/websocket/${userStore.user.id}`,
    );
  }

  // 返回 Promise，socket创建成功则resolve，失败则reject
  init() {
    return new Promise((resove, reject) => {
      this.socket.addEventListener('open', () => {
        console.log(Platform.OS, 'onopen');
        resove(true);
      });

      this.socket.addEventListener('close', e => {
        console.log(Platform.OS, 'onclose', e);
      });

      this.socket.addEventListener('error', e => {
        console.log(Platform.OS, 'onerror', e);
      });

      this.socket.addEventListener('message', msg => {
        console.log(Platform.OS, 'onmessage', msg.data);

        const {data, flag, event} = JSON.parse(msg.data);

        if (!flag)
          return Toast.show({
            description: '出错了，请稍后重试',
            duration: 2000,
          });

        switch (event) {
          case 'error':
            console.log(Platform.OS, 'error', data.msg);
            Toast.show({description: '出错了，请稍后重试', duration: 2000});

            break;

          case 'start-chat':
            const {opponent, isFriend} = data as IDataOfStartChatEvent;

            // 更新全局状态（聊天对象信息 & chat状态）
            const {
              id,
              departmentCode,
              nickname,
              sex,
              interestCodeList,
              headPhoto,
            } = opponent;
            chatStore.updateOpponent({
              id,
              departmentCode,
              sex,
              nickname,
              interestCodeList: interestCodeList
                ? interestCodeList.split(',')
                : [],
              headPhoto,
              isFriend,
            });
            chatStore.updateState(ChatStateType.CHATTING);
            clearInterval(chatStore.timer);

            break;

          case 'message':
            const _data = data as IDataOfMessageEvent;

            const {isCanceled, message, isTopic} = _data;

            if (isCanceled) {
              // cancel类型消息
              chatStore.addMessageSelf({...cancelMessage});
            } else if (isTopic) {
              // 推荐话题
              if (message) {
                message.user.avatar = require('~assets/images/logo.png');
                chatStore.addMessageSelf(message);
              }
            } else {
              // 用户消息
              if (message) {
                message.user.avatar =
                  chatStore.opponent.headPhoto ??
                  require('~assets/images/avatar.png');
                chatStore.addMessageSelf(message);
              }
            }

            break;

          case 'friend-apply':
            chatStore.updateFriendApplyResult(FriendApplyResultType.PENDING);

            break;

          case 'friend-reply':
            const {result} = data as IDataOfFriendReplyEvent;

            if (result === FriendApplyResultType.SUCCESS)
              chatStore.updateFriendApplyResult(FriendApplyResultType.SUCCESS);
            else chatStore.updateFriendApplyResult(FriendApplyResultType.FAIL);

            break;
        }
      });
    });
  }

  close() {
    this.socket.close();
  }

  // 主动监测匹配状态
  detectState() {
    if (this.socket.readyState === 1) {
      console.log(Platform.OS, 'detect');
      this.socket.send(
        JSON.stringify({
          event: 'heart-detect',
          flag: true,
          data: null,
        }),
      );
    }
  }

  startMatch() {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'start-matching',
          flag: true,
          data: null,
        }),
      );
  }

  stopMatch() {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'stop-matching',
          flag: true,
          data: null,
        }),
      );
  }

  sendMessage(data: IDataOfMessageEvent) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'message',
          flag: true,
          data: data,
        }),
      );
  }

  sendFriendApply(data: IDataOfFriendApplyEvent) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'friend-apply',
          flag: true,
          data: data,
        }),
      );
  }

  sendFriendReply(data: IDataOfFriendReplyEvent) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'friend-reply',
          flag: true,
          data: data,
        }),
      );
  }
}
