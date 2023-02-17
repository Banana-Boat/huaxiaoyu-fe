import {useCallback, useState} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {
  IMessageOfMsg,
  MessageResultType,
  MessageType,
} from '~stores/message/types';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import PhoneNumInputModal from './components/phone-num-input-modal';
import {BackRowBtnWidth} from './constants';

interface IProps {
  sendMsgList?: IMessageOfMsg[];
  receiveMsgList?: IMessageOfMsg[];
}

const SwipeList = ({sendMsgList, receiveMsgList}: IProps) => {
  const isReceive = receiveMsgList ? true : false;

  const markReadBtnHandle = useCallback((messageId: string) => {}, []);
  const copyBtnHandle = useCallback((text: string) => {}, []);
  const approveBtnHandle = useCallback(
    (messageId: string, opponentId: number, type: MessageType) => {
      setIsShowPhoneNumInputModal(true);
    },
    [],
  );
  const rejectBtnHandle = useCallback(
    (messageId: string, opponentId: number) => {},
    [],
  );

  const [isShowPhoneNumInputModal, setIsShowPhoneNumInputModal] =
    useState(false);
  const submitPhoneNum = useCallback((phoneNum: string) => {}, []);

  return (
    <>
      <PhoneNumInputModal
        isOpen={isShowPhoneNumInputModal}
        close={() => setIsShowPhoneNumInputModal(false)}
        submit={submitPhoneNum}
      />

      <SwipeListView
        data={isReceive ? receiveMsgList : sendMsgList}
        keyExtractor={item => item.messageId}
        renderItem={({item}) => {
          const isNeedReply =
            item.type === MessageType.APPLY_FRIEND ||
            item.type === MessageType.APPLY_PHONE;
          const hasStatus = isReceive;
          const hasPhoneNum =
            item.type === MessageType.REPLY_PHONE &&
            item.result === MessageResultType.APPROVE;

          return (
            <SwipeRow
              disableLeftSwipe={!isNeedReply && !hasPhoneNum}
              disableRightSwipe={!hasStatus}
              leftOpenValue={hasStatus ? BackRowBtnWidth : 0}
              rightOpenValue={
                isNeedReply
                  ? -2 * BackRowBtnWidth
                  : hasPhoneNum
                  ? -BackRowBtnWidth
                  : 0
              }>
              {/* 底部隐藏按钮 */}
              <BackRow
                isNeedReply={isNeedReply}
                hasStatus={hasStatus}
                hasPhoneNum={hasPhoneNum}
                markReadBtnHandle={
                  hasStatus
                    ? () => markReadBtnHandle(item.messageId)
                    : undefined
                }
                approveBtnHandle={
                  isNeedReply
                    ? () =>
                        approveBtnHandle(
                          item.messageId,
                          item.opponent.id,
                          item.type,
                        )
                    : undefined
                }
                rejectBtnHandle={
                  isNeedReply
                    ? () => rejectBtnHandle(item.messageId, item.opponent.id)
                    : undefined
                }
                copyBtnHandle={
                  hasPhoneNum
                    ? () => copyBtnHandle(item.opponent.phoneNum ?? '')
                    : undefined
                }
              />

              {/* 顶部列表项 */}
              <FrontRow data={item} />
            </SwipeRow>
          );
        }}
      />
    </>
  );
};

export default SwipeList;
