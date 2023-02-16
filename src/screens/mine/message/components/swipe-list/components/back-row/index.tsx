import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import {IMessageOfMsg} from '~stores/message/types';
import {BackRowBtnWidth, RowHeight} from '../../constants';

interface IProps {
  hasStatus: boolean;
  isNeedReply: boolean;
}

const BackRow = ({hasStatus, isNeedReply}: IProps) => {
  return (
    <HStack flex={1} h={RowHeight}>
      {hasStatus && (
        <Pressable
          position="absolute"
          left={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="orange.400"
          justifyContent="center"
          // onPress={() => closeRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              标记已读
            </Text>
          </VStack>
        </Pressable>
      )}

      {isNeedReply && (
        <Pressable
          position="absolute"
          right={BackRowBtnWidth}
          h={RowHeight}
          w={BackRowBtnWidth}
          bg="teal.500"
          _dark={{bg: 'teal.600'}}
          justifyContent="center"
          // onPress={() => closeRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              同意
            </Text>
          </VStack>
        </Pressable>
      )}

      {isNeedReply && (
        <Pressable
          position="absolute"
          right={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="rose.500"
          justifyContent="center"
          // onPress={() => closeRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              拒绝
            </Text>
          </VStack>
        </Pressable>
      )}
    </HStack>
  );
};

export default BackRow;
