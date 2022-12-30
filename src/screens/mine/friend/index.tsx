import {Icon, Input} from 'native-base';
import PageContainer from '~components/page-container';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
        mt={2}
        px={2}
        InputLeftElement={
          <Icon ml={3} color="gray.400" as={Ionicon} name="search" />
        }
      />
    </PageContainer>
  );
};

export default FriendScreen;
