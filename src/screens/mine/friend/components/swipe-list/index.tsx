import {useCallback} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {IFriend} from '~stores/friend/types';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import {LeftBackRowBtnWidth, RightBackRowBtnWidth} from './constants';

interface IProps {
  friendList: IFriend[];
}

const SwipeList = ({friendList}: IProps) => {
  const deleteBtnHandle = useCallback((opponentId: number) => {}, []);
  const phoneNumBtnHandle = useCallback((opponentId: number) => {}, []);

  return (
    <>
      <SwipeListView
        data={friendList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const isNeedPhoneNumBtn = item.phoneNum ? true : false;
          return (
            <SwipeRow
              disableRightSwipe={!isNeedPhoneNumBtn}
              leftOpenValue={isNeedPhoneNumBtn ? LeftBackRowBtnWidth : 0}
              rightOpenValue={-RightBackRowBtnWidth}>
              {/* 底部隐藏按钮 */}
              <BackRow
                isNeedPhoneNumBtn={isNeedPhoneNumBtn}
                deleteBtnHandle={() => deleteBtnHandle(item.id)}
                phoneNumBtnHandle={
                  isNeedPhoneNumBtn
                    ? () => phoneNumBtnHandle(item.id)
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
