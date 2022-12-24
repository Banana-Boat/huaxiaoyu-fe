import {Toast} from 'native-base';
import {Platform} from 'react-native';
import userStore from '~stores/user/userStore';
import chatStore from './chatStore';
import {ChatStateType, IDataOfStartChatEvent} from './types';

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

      this.socket.addEventListener('close', () =>
        console.log(Platform.OS, 'socket closed'),
      );

      this.socket.addEventListener('error', err => {
        console.log(Platform.OS, err);
        Toast.show({description: 'Socket连接错误...', duration: 2000});
        reject(err);
      });

      this.socket.addEventListener('message', msg => {
        const {data, flag, event} = JSON.parse(msg.data);

        if (!flag)
          return Toast.show({description: 'Socket连接错误...', duration: 2000});

        switch (event) {
          case 'start-chat':
            const _data = data as IDataOfStartChatEvent;

            // 更新全局状态（聊天对象信息 & chat状态）
            chatStore.updateOpponent({
              id: _data.opponentUserid,
              departmentCode: _data.opponentDepartmentCode.toString(),
              interestCodeList: _data.opponentInterestCodeList.split(','),
              sex: _data.opponentSex,
              nickname: _data.opponentUsername,
            });
            chatStore.updateState(ChatStateType.CHATTING);
            clearInterval(chatStore.timer);

            break;
          case 'message':
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

  sendMessage() {}
}
