import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {
  IMessageOfMsg,
  MessageStatusType,
  MessageType,
} from '~stores/message/types';
import {SexType} from '~stores/user/types';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import {BackRowBtnWidth} from './constants';

interface IProps {
  sendMsgList?: IMessageOfMsg[];
  receiveMsgList?: IMessageOfMsg[];
}
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
];

const SwipeList = ({sendMsgList, receiveMsgList}: IProps) => {
  const isSend = sendMsgList ? true : false;

  return (
    <SwipeListView
      data={data}
      keyExtractor={item => item.messageId}
      renderItem={({item}) => {
        const isNeedReply = true;
        const hasStatus = true;

        return (
          <SwipeRow
            disableLeftSwipe={!hasStatus}
            disableRightSwipe={!isNeedReply}
            leftOpenValue={hasStatus ? BackRowBtnWidth : 0}
            rightOpenValue={isNeedReply ? -2 * BackRowBtnWidth : 0}>
            {/* 底部隐藏按钮 */}
            <BackRow isNeedReply={isNeedReply} hasStatus={hasStatus} />

            {/* 顶部列表项 */}
            <FrontRow data={item} />
          </SwipeRow>
        );
      }}
    />
  );
};

export default SwipeList;
