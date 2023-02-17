import {observer} from 'mobx-react-lite';
import {Box} from 'native-base';
import {useState} from 'react';
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
    messageId: '001',
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
    messageId: '002',
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
    messageId: '003',
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
    messageId: '004',
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
    messageId: '005',
    status: MessageStatusType.UNREAD,
  },
];

const MessageScreen = () => {
  const [curTab, setCurTab] = useState(TabType.RECEIVE);

  return (
    <PageContainer hasHeader title="消息中心">
      <Tab curTab={curTab} toggleTab={tab => setCurTab(tab)} />
      <Box flex={1} mt={1}>
        {curTab === TabType.RECEIVE ? (
          <SwipeList receiveMsgList={data} />
        ) : (
          <SwipeList sendMsgList={[]} />
        )}
      </Box>
    </PageContainer>
  );
};

export default observer(MessageScreen);
