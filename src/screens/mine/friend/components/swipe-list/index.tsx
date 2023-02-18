import Clipboard from '@react-native-clipboard/clipboard';
import {Toast} from 'native-base';
import {useCallback, useState} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Empty from '~components/empty';
import {getFriendList} from '~screens/mine/api';
import {IFriend} from '~stores/friend/types';
import {applyPhoneNum, deleteFriend} from './api';
import BackRow from './components/back-row';
import DeleteConfirmModal from './components/delete-confirm-modal';
import FrontRow from './components/front-row';
import {BackRowLeftBtnWidth, BackRowRightBtnWidth} from './constants';

interface IProps {
  friendList: IFriend[];
}

const SwipeList = ({friendList}: IProps) => {
  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] =
    useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  const deleteBtnHandle = useCallback(async (opponentId: number) => {
    setIsShowDeleteConfirmModal(false);

    if (!(await deleteFriend({opponentId})))
      Toast.show({description: '删除好友失败', duration: 2000});

    Toast.show({description: '删除好友成功', duration: 2000});
    getFriendList().catch(() =>
      Toast.show({description: '获取好友列表失败', duration: 2000}),
    );
  }, []);

  const applyBtnHandle = useCallback(async (opponentId: number) => {
    if (!(await applyPhoneNum({opponentId})))
      return Toast.show({description: '申请失败，请稍后重试', duration: 2000});

    Toast.show({description: '联系方式申请已发出', duration: 2000});
  }, []);

  return (
    <>
      <DeleteConfirmModal
        isOpen={isShowDeleteConfirmModal}
        close={() => setIsShowDeleteConfirmModal(false)}
        deleteId={deleteId}
        deleteBtnHandle={deleteBtnHandle}
      />
      {friendList.length === 0 ? (
        <Empty />
      ) : (
        <SwipeListView
          data={friendList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const hasPhoneNum = item.phoneNum ? true : false;

            return (
              <SwipeRow
                disableRightSwipe={hasPhoneNum}
                leftOpenValue={hasPhoneNum ? 0 : BackRowLeftBtnWidth}
                rightOpenValue={
                  hasPhoneNum
                    ? -2 * BackRowRightBtnWidth
                    : -BackRowRightBtnWidth
                }>
                {/* 底部隐藏按钮 */}
                <BackRow
                  hasPhoneNum={hasPhoneNum}
                  deleteBtnHandle={() => {
                    setDeleteId(item.id);
                    setIsShowDeleteConfirmModal(true);
                  }}
                  applyBtnHandle={
                    hasPhoneNum ? () => applyBtnHandle(item.id) : () => {}
                  }
                  copyBtnHandle={
                    hasPhoneNum
                      ? () => {
                          Clipboard.setString(item.phoneNum as string);
                          Toast.show({
                            description: '复制成功',
                            duration: 2000,
                          });
                        }
                      : () => {}
                  }
                />

                {/* 顶部列表项 */}
                <FrontRow data={item} />
              </SwipeRow>
            );
          }}
        />
      )}
    </>
  );
};

export default SwipeList;
