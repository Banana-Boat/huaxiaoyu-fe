import {Icon, Input} from 'native-base';
import PageContainer from '~components/page-container';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SwipeList from './components/swipe-list';
import {IFriend} from '~stores/friend/types';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import friendStore from '~stores/friend/friendStore';

const FriendScreen = () => {
  const [friendList, setFriendList] = useState<IFriend[]>([]);

  useEffect(() => {
    setFriendList(friendStore.friendList);
  }, [friendStore.friendList]);

  return (
    <PageContainer hasHeader title="朋友列表">
      <Input
        onChangeText={(text: string) =>
          setFriendList(() =>
            friendStore.friendList.filter(item =>
              item.nickname.toLocaleLowerCase().includes(text),
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
      <SwipeList friendList={friendList} />
    </PageContainer>
  );
};

export default observer(FriendScreen);
