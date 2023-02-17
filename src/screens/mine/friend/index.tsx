import {Icon, Input} from 'native-base';
import PageContainer from '~components/page-container';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SwipeList from './components/swipe-list';
import {IFriend} from '~stores/friend/types';
import {SexType} from '~stores/user/types';

const data: IFriend[] = [
  {
    id: 0,
    sex: SexType.FEMALE,
    nickname: 'Huster_宇航员',
    departmentCode: '1',
    phoneNum: '19975269369',
  },
];

const FriendScreen = () => {
  return (
    <PageContainer hasHeader title="朋友列表">
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
      <SwipeList friendList={data} />
    </PageContainer>
  );
};

export default FriendScreen;
