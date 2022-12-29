import {IMessage} from 'react-native-gifted-chat';

export const startMessage: IMessage = {
  _id: 0,
  text: '开始畅聊吧！',
  createdAt: new Date(),
  user: {
    _id: 0,
    avatar: require('~assets/images/logo.png'),
  },
};

export const cancelMessage: IMessage = {
  _id: 1,
  text: '呜呜，对方离开了聊天室',
  createdAt: new Date(),
  user: {
    _id: 0,
    avatar: require('~assets/images/logo.png'),
  },
};
