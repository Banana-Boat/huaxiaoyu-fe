import Clipboard from '@react-native-clipboard/clipboard';
import {Toast} from 'native-base';
import {useCallback, useState} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Empty from '~components/empty';
import {updateUserInfo} from '~screens/mine/edit-info/api';
import messageStore from '~stores/message/messageStore';
import {
  IMessageOfMsg,
  MessageResultType,
  MessageStatusType,
  MessageType,
} from '~stores/message/types';
import userStore from '~stores/user/userStore';
import {replyFriend, replyPhoneNum, updateStatusOfMsg} from './api';
import BackRow from './components/back-row';
import FrontRowOfReceive from './components/front-row-receive';
import FrontRowOfSend from './components/front-row-send';
import PhoneNumInputModal from './components/phone-num-input-modal';
import {BackRowBtnWidth} from './constants';

interface IProps {
  isReceive: boolean;
  messageList: IMessageOfMsg[];
}

const SwipeList = ({isReceive, messageList}: IProps) => {
  const markReadBtnHandle = useCallback(async (messageId: number) => {
    if (!(await updateStatusOfMsg({messageId})))
      return Toast.show({description: '修改状态失败', duration: 2000});

    if (isReceive) messageStore.updateStatusOfReceiveMsg(messageId);
    else messageStore.updateStatusOfSendMsg(messageId);
  }, []);

  const approveBtnHandle = useCallback(
    async (messageId: number, opponentId: number, type: MessageType) => {
      switch (type) {
        case MessageType.APPLY_FRIEND:
          if (
            !(await replyFriend({
              messageId,
              opponentId,
              result: MessageResultType.APPROVE,
            }))
          )
            return Toast.show({description: '回复失败', duration: 2000});

          Toast.show({description: '回复成功', duration: 2000});
          if (isReceive) messageStore.updateStatusOfReceiveMsg(messageId);
          else messageStore.updateStatusOfSendMsg(messageId);

          break;
        case MessageType.APPLY_PHONE:
          if (!userStore.user.phoneNum) {
            setIsShowPhoneNumInputModal(true);
            return;
          }

          if (
            !(await replyPhoneNum({
              messageId,
              opponentId,
              result: MessageResultType.APPROVE,
            }))
          )
            return Toast.show({description: '回复失败', duration: 2000});

          Toast.show({description: '回复成功', duration: 2000});
          if (isReceive) messageStore.updateStatusOfReceiveMsg(messageId);
          else messageStore.updateStatusOfSendMsg(messageId);

          break;
      }
    },
    [],
  );

  const rejectBtnHandle = useCallback(
    async (messageId: number, opponentId: number, type: MessageType) => {
      switch (type) {
        case MessageType.APPLY_FRIEND:
          if (
            !(await replyFriend({
              messageId,
              opponentId,
              result: MessageResultType.REJECT,
            }))
          )
            return Toast.show({description: '回复失败', duration: 2000});

          Toast.show({description: '回复成功', duration: 2000});
          if (isReceive) messageStore.updateStatusOfReceiveMsg(messageId);
          else messageStore.updateStatusOfSendMsg(messageId);

          break;
        case MessageType.APPLY_PHONE:
          if (
            !(await replyPhoneNum({
              messageId,
              opponentId,
              result: MessageResultType.REJECT,
            }))
          )
            return Toast.show({description: '回复失败', duration: 2000});

          Toast.show({description: '回复成功', duration: 2000});
          if (isReceive) messageStore.updateStatusOfReceiveMsg(messageId);
          else messageStore.updateStatusOfSendMsg(messageId);

          break;
      }
    },
    [],
  );

  const [isShowPhoneNumInputModal, setIsShowPhoneNumInputModal] =
    useState(false);
  const submitPhoneNum = useCallback(async (phoneNum: string) => {
    if (!(await updateUserInfo({username: userStore.user.username, phoneNum})))
      return Toast.show({description: '修改失败', duration: 2000});

    Toast.show({description: '修改成功', duration: 2000});
    setIsShowPhoneNumInputModal(false);
  }, []);

  return (
    <>
      <PhoneNumInputModal
        isOpen={isShowPhoneNumInputModal}
        close={() => setIsShowPhoneNumInputModal(false)}
        submit={submitPhoneNum}
      />
      {messageList.length === 0 ? (
        <Empty />
      ) : (
        <SwipeListView
          data={messageList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}, rowMap) => {
            const isNeedReply =
              isReceive &&
              item.status === MessageStatusType.UNREAD &&
              (item.type === MessageType.APPLY_FRIEND ||
                item.type === MessageType.APPLY_PHONE);

            const isNeedUpdateStatus =
              isReceive && item.status === MessageStatusType.UNREAD;
            const hasPhoneNum =
              isReceive &&
              item.type === MessageType.REPLY_PHONE &&
              item.result === MessageResultType.APPROVE;

            return (
              <SwipeRow
                disableLeftSwipe={!isNeedReply && !hasPhoneNum}
                disableRightSwipe={!isNeedUpdateStatus || isNeedReply}
                leftOpenValue={isNeedUpdateStatus ? BackRowBtnWidth : 0}
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
                  isNeedUpdateStatus={isNeedUpdateStatus}
                  hasPhoneNum={hasPhoneNum}
                  markReadBtnHandle={
                    isNeedUpdateStatus
                      ? () => {
                          markReadBtnHandle(item.id);
                          rowMap[item.id].closeRow();
                        }
                      : undefined
                  }
                  approveBtnHandle={
                    isNeedReply
                      ? () => {
                          approveBtnHandle(
                            item.id,
                            item.opponent.id,
                            item.type,
                          );
                          rowMap[item.id].closeRow();
                        }
                      : undefined
                  }
                  rejectBtnHandle={
                    isNeedReply
                      ? () => {
                          rejectBtnHandle(item.id, item.opponent.id, item.type);
                          rowMap[item.id].closeRow();
                        }
                      : undefined
                  }
                  copyBtnHandle={
                    hasPhoneNum
                      ? () => {
                          Clipboard.setString(item.opponent.phoneNum as string);
                          Toast.show({
                            description: '复制成功',
                            duration: 2000,
                          });
                          rowMap[item.id].closeRow();
                        }
                      : undefined
                  }
                />

                {/* 顶部列表项 */}
                {isReceive ? (
                  <FrontRowOfReceive data={item} />
                ) : (
                  <FrontRowOfSend data={item} />
                )}
              </SwipeRow>
            );
          }}
        />
      )}
    </>
  );
};

export default SwipeList;
