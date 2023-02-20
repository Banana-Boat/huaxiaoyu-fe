import {Toast} from 'native-base';
import {useCallback} from 'react';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Empty from '~components/empty';
import {IRecord} from '~stores/record/types';
import {applyFriend} from './api';
import BackRow from './components/back-row';
import FrontRow from './components/front-row';
import {BackRowBtnWidth} from './constants';

interface IProps {
  recordList: IRecord[];
}

const SwipeList = ({recordList}: IProps) => {
  const applyBtnHandle = useCallback(async (opponentId: number) => {
    if (!(await applyFriend({opponentId})))
      return Toast.show({
        description: '申请失败，请稍后重试',
        duration: 2000,
      });

    Toast.show({description: '申请已发出', duration: 2000});
  }, []);

  return (
    <>
      {recordList.length === 0 ? (
        <Empty />
      ) : (
        <SwipeListView
          data={recordList}
          keyExtractor={item => item.recordId.toString()}
          closeOnRowPress={true}
          renderItem={({item}, rowMap) => {
            return (
              <SwipeRow
                disableRightSwipe={true}
                disableLeftSwipe={item.isFriend}
                rightOpenValue={item.isFriend ? 0 : -BackRowBtnWidth}>
                {/* 底部隐藏按钮 */}
                <BackRow
                  isFriend={item.isFriend}
                  applyBtnHandle={() => {
                    applyBtnHandle(item.opponent.id);
                    rowMap[item.recordId].closeRow();
                  }}
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
