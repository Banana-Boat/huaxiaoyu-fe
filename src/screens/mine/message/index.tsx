import {observer} from 'mobx-react-lite';
import {Box, Icon, Input} from 'native-base';
import {useEffect, useState} from 'react';
import PageContainer from '~components/page-container';
import {
  IMessageOfMsg,
  MessageType,
  MessageStatusType,
  MessageResultType,
} from '~stores/message/types';
import {SexType} from '~stores/user/types';
import SwipeList from './components/swipe-list';
import Tab from './components/tab';
import {TabType} from './types';
import Ionicon from 'react-native-vector-icons/Ionicons';

const data: IMessageOfMsg[] = [
  {
    type: MessageType.APPLY_FRIEND,
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '0',
    },
    createdAt: '2023-02-16T08:07:38.355Z',
    messageId: 1,
    status: MessageStatusType.UNREAD,
  },
  {
    type: MessageType.APPLY_PHONE,
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '0',
    },
    createdAt: '2023-02-16T08:07:38.355Z',
    messageId: 2,
    status: MessageStatusType.UNREAD,
  },
  {
    type: MessageType.DELETE_FRIEND,
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '0',
    },
    createdAt: '2023-02-16T08:07:38.355Z',
    messageId: 3,
    status: MessageStatusType.UNREAD,
  },
  {
    type: MessageType.REPLY_FRIEND,
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '0',
    },
    result: MessageResultType.REJECT,
    createdAt: '2023-02-16T08:07:38.355Z',
    messageId: 4,
    status: MessageStatusType.UNREAD,
  },
  {
    type: MessageType.REPLY_PHONE,
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '0',
      phoneNum: '19975269369',
    },
    result: MessageResultType.APPROVE,
    createdAt: '2023-02-16T08:07:38.355Z',
    messageId: 5,
    status: MessageStatusType.UNREAD,
  },
];

const MessageScreen = () => {
  const [curTab, setCurTab] = useState(TabType.RECEIVE);
  const [sendMessageList, setSendMessageList] = useState<IMessageOfMsg[]>([]);
  const [receiveMessageList, setReceiveMessageList] = useState<IMessageOfMsg[]>(
    [],
  );

  useEffect(() => {
    setSendMessageList([]);
    setReceiveMessageList(data);
  }, [data]);

  return (
    <PageContainer hasHeader title="消息中心">
      <Tab curTab={curTab} toggleTab={tab => setCurTab(tab)} />
      <Input
        onChangeText={(text: string) => {
          if (curTab === TabType.SEND)
            setSendMessageList(() =>
              data.filter(item =>
                item.opponent.nickname.toLocaleLowerCase().includes(text),
              ),
            );
          if (curTab === TabType.RECEIVE)
            setReceiveMessageList(() =>
              data.filter(item =>
                item.opponent.nickname.toLocaleLowerCase().includes(text),
              ),
            );
        }}
        placeholder="搜索"
        variant="filled"
        bg="dark.900"
        _dark={{bg: 'dark.100'}}
        rounded={20}
        mx={2}
        my={2}
        px={2}
        InputLeftElement={
          <Icon ml={3} color="gray.400" as={Ionicon} name="search" />
        }
      />
      <Box flex={1} mt={1}>
        {curTab === TabType.RECEIVE ? (
          <SwipeList isReceive={true} messageList={receiveMessageList} />
        ) : (
          <SwipeList isReceive={false} messageList={sendMessageList} />
        )}
      </Box>
    </PageContainer>
  );
};

export default observer(MessageScreen);
