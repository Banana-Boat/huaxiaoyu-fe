import dayjs from 'dayjs';
import {HStack, Avatar, VStack, Text, Box} from 'native-base';
import {
  IMessageOfMsg,
  MessageResultType,
  MessageType,
} from '~stores/message/types';
import {RowHeight} from '../../constants';

interface IProps {
  data: IMessageOfMsg;
}

const FrontRowOfSend = ({data}: IProps) => {
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
            {data.type === MessageType.APPLY_FRIEND ? '好友申请已发送' : ''}
            {data.type === MessageType.APPLY_PHONE ? '联系方式申请已发送' : ''}
            {data.type === MessageType.DELETE_FRIEND
              ? '你已将对方移除好友列表'
              : ''}
            {data.type === MessageType.REPLY_FRIEND
              ? data.result === MessageResultType.APPROVE
                ? '你同意了对方的好友申请，去朋友列表看看吧'
                : '你拒绝了对方的好友申请'
              : ''}
            {data.type === MessageType.REPLY_PHONE
              ? data.result === MessageResultType.APPROVE
                ? `你同意了对方的联系方式申请`
                : '你拒绝了对方的联系方式申请'
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

export default FrontRowOfSend;
