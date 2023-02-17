import dayjs from 'dayjs';
import {HStack, Avatar, VStack, Text, Box, Badge} from 'native-base';
import {IRecord} from '~stores/record/types';
import userStore from '~stores/user/userStore';
import {RowHeight} from '../../constants';

interface IProps {
  data: IRecord;
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
      <HStack space={5}>
        <Avatar.Group left={3} _avatar={{size: 'md'}}>
          <Avatar
            source={
              data.opponent.headPhoto
                ? {uri: data.opponent.headPhoto}
                : require('~assets/images/avatar.png')
            }
          />
          <Avatar
            source={
              userStore.user.headPhoto
                ? {uri: userStore.user.headPhoto}
                : require('~assets/images/avatar.png')
            }
          />
        </Avatar.Group>

        <VStack>
          <HStack>
            <Text
              fontSize={15}
              color="dark.200"
              _dark={{
                color: 'coolGray.50',
              }}>
              {data.opponent.nickname}
            </Text>
            {data.isFriend && (
              <Badge
                ml={3}
                colorScheme="orange"
                rounded="full"
                variant="outline">
                已是好友
              </Badge>
            )}
          </HStack>
          <Text
            fontSize={13}
            color="coolGray.500"
            _dark={{
              color: 'coolGray.400',
            }}>
            {userStore.getDepartmentName(data.opponent.departmentCode) ?? ''}
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
          {dayjs(data.createdAt).format('MM-DD')}
        </Text>
        <Text
          fontSize="xs"
          color="coolGray.500"
          _dark={{
            color: 'coolGray.400',
          }}>
          {dayjs(data.createdAt).format('HH:mm')}
        </Text>
      </VStack>
    </HStack>
  );
};

export default FrontRow;
