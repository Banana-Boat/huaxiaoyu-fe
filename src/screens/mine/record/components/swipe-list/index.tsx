import {useCallback} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {IRecord} from '~stores/record/types';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import {BackRowBtnWidth} from './constants';

interface IProps {
  recordList: IRecord[];
}

const SwipeList = ({recordList}: IProps) => {
  const applyBtnHandle = useCallback((opponentId: number) => {}, []);

  return (
    <>
      <SwipeListView
        data={recordList}
        keyExtractor={item => item.recordId.toString()}
        renderItem={({item}) => {
          return (
            <SwipeRow
              disableRightSwipe={true}
              disableLeftSwipe={item.isFriend}
              rightOpenValue={item.isFriend ? 0 : -BackRowBtnWidth}>
              {/* 底部隐藏按钮 */}
              <BackRow
                isFriend={item.isFriend}
                applyBtnHandle={() => applyBtnHandle(item.opponent.id)}
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
