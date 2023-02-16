import dayjs from 'dayjs';
import {HStack, Avatar, VStack, Text, Box} from 'native-base';
import {IMessageOfMsg, MessageType} from '~stores/message/types';
import {RowHeight} from '../../constants';

interface IProps {
  data: IMessageOfMsg;
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
        <Box>
          <Avatar
            source={
              data.opponent.headPhoto
                ? {
                    uri: data.opponent.headPhoto,
                  }
                : require('~assets/images/avatar.png')
            }
            size="md"
            bg="dark.200"
            shadow={1}
            _dark={{bg: 'coolGray.200'}}
            style={{padding: 2}}
          />
          <Box
            position="absolute"
            background="rose.500"
            rounded="full"
            w={3}
            h={3}
            right={0}
          />
        </Box>

        <VStack>
          <Text
            fontSize={15}
            color="dark.200"
            _dark={{
              color: 'coolGray.50',
            }}>
            {data.opponent.nickname}
          </Text>
          <Text
            fontSize={13}
            color="coolGray.500"
            _dark={{
              color: 'coolGray.400',
            }}>
            {data.type === MessageType.APPLY_FRIEND
              ? '上次聊得很开心，可以交个朋友吗？'
              : ''}
            {data.type === MessageType.APPLY_PHONE
              ? 'Hello，方便留个电话吗？'
              : ''}
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
