import {Icon, Input} from 'native-base';
import PageContainer from '~components/page-container';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SwipeList from './components/swipe-list';
import {SexType} from '~stores/user/types';
import {IRecord} from '~stores/record/types';

const data: IRecord[] = [
  {
    opponent: {
      id: 0,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '1',
    },
    recordId: 0,
    createdAt: '2023-02-16T08:07:38.355Z',
    isFriend: true,
  },
  {
    opponent: {
      id: 2,
      sex: SexType.FEMALE,
      nickname: 'Huster_宇航员',
      departmentCode: '1',
    },
    recordId: 1,
    createdAt: '2023-02-16T08:07:38.355Z',
    isFriend: false,
  },
];

const RecordScreen = () => {
  return (
    <PageContainer hasHeader title="聊天记录列表">
      <Input
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
      <SwipeList recordList={data} />
    </PageContainer>
  );
};

export default RecordScreen;
