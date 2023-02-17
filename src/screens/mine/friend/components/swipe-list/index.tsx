import {useCallback} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {IFriend} from '~stores/friend/types';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import {BackRowLeftBtnWidth, BackRowRightBtnWidth} from './constants';

interface IProps {
  friendList: IFriend[];
}

const SwipeList = ({friendList}: IProps) => {
  const deleteBtnHandle = useCallback((opponentId: number) => {}, []);
  const copyBtnHandle = useCallback((phoneNum: string) => {}, []);
  const applyBtnHandle = useCallback((opponentId: number) => {}, []);

  return (
    <>
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
                hasPhoneNum ? -2 * BackRowRightBtnWidth : -BackRowRightBtnWidth
              }>
              {/* 底部隐藏按钮 */}
              <BackRow
                hasPhoneNum={hasPhoneNum}
                deleteBtnHandle={() => deleteBtnHandle(item.id)}
                applyBtnHandle={
                  hasPhoneNum ? () => applyBtnHandle(item.id) : () => {}
                }
                copyBtnHandle={
                  hasPhoneNum
                    ? () => copyBtnHandle(item.phoneNum as string)
                    : () => {}
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
