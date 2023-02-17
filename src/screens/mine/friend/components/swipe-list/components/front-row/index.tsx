import {HStack, Avatar, VStack, Text} from 'native-base';
import {IFriend} from '~stores/friend/types';
import {SexType} from '~stores/user/types';
import userStore from '~stores/user/userStore';
import {RowHeight} from '../../constants';

interface IProps {
  data: IFriend;
}

const FrontRow = ({data}: IProps) => {
  return (
    <HStack
      h={RowHeight}
      w="100%"
      background="white"
      _dark={{background: 'dark.100'}}
      justifyContent="space-between"
      alignItems="center"
      px={2}>
      <HStack space={4}>
        <Avatar
          source={
            data.headPhoto
              ? {
                  uri: data.headPhoto,
                }
              : require('~assets/images/avatar.png')
          }
          size="md"
          bg={data.sex === SexType.FEMALE ? 'pink.400' : 'lightBlue.400'}
          shadow={1}
          style={{padding: 2}}
        />

        <VStack>
          <Text
            fontSize={15}
            color="dark.200"
            _dark={{
              color: 'coolGray.50',
            }}>
            {data.nickname}
          </Text>
          <Text
            fontSize={13}
            color="coolGray.500"
            _dark={{
              color: 'coolGray.400',
            }}>
            {userStore.getDepartmentName(data.departmentCode) ?? ''}
          </Text>
        </VStack>
      </HStack>

      <VStack>
        <Text
          fontSize="xs"
          color="coolGray.500"
          _dark={{
            color: 'coolGray.400',
          }}>
          {data.phoneNum ?? ''}
        </Text>
      </VStack>
    </HStack>
  );
};

export default FrontRow;
