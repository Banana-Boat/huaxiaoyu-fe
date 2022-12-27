import {Toast} from 'native-base';
import {Platform} from 'react-native';
import userStore from '~stores/user/userStore';
import chatStore from './chatStore';
import {
  ChatStateType,
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
        resove(true);
        console.log(Platform.OS, 'socket opened');
      });

      this.socket.addEventListener('close', e =>
        console.log(Platform.OS, 'socket closed', e),
      );

      this.socket.addEventListener('error', err => {
        console.log(Platform.OS, err);
        Toast.show({description: 'Socket连接错误...', duration: 2000});
        reject(err);
      });

      this.socket.addEventListener('message', msg => {
        console.log(msg.data);
        const {data, flag, event} = JSON.parse(msg.data);

        if (!flag)
          return Toast.show({description: 'Socket连接错误...', duration: 2000});

        switch (event) {
          case 'start-chat':
            const {opponent} = data as IDataOfStartChatEvent;

            // 更新全局状态（聊天对象信息 & chat状态）
            const {id, departmentCode, nickname, sex, interestCodeList} =
              opponent;
            chatStore.updateOpponent({
              id,
              departmentCode,
              sex,
              nickname,
              interestCodeList: interestCodeList.split(','),
            });
            chatStore.updateState(ChatStateType.CHATTING);
            clearInterval(chatStore.timer);

            break;

          case 'message':
            const _data = data as IDataOfMessageEvent;
            console.log(_data);

            const {receiveId, sendId, ...restData} = _data;
            restData.user.avatar = require('~assets/images/avatar2.png'); // 待删除
            chatStore.updateMessageList([restData]);

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

  sendMessage(message: IDataOfMessageEvent) {
    console.log(message);
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: 'message',
          flag: true,
          data: message,
        }),
      );
  }
}