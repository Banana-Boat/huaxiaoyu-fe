import {Icon, Input} from 'native-base';
import PageContainer from '~components/page-container';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SwipeList from './components/swipe-list';
import {SexType} from '~stores/user/types';
import {IRecord} from '~stores/record/types';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import recordStore from '~stores/record/recordStore';

const RecordScreen = () => {
  const [recordList, setRecordList] = useState<IRecord[]>([]);
  useEffect(() => {
    setRecordList(recordStore.recordList);
  }, [recordStore.recordList]);

  return (
    <PageContainer hasHeader title="聊天记录列表">
      <Input
        onChangeText={(text: string) =>
          setRecordList(() =>
            recordStore.recordList.filter(item =>
              item.opponent.nickname.toLocaleLowerCase().includes(text),
            ),
          )
        }
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
      <SwipeList recordList={recordList} />
    </PageContainer>
  );
};

export default observer(RecordScreen);
