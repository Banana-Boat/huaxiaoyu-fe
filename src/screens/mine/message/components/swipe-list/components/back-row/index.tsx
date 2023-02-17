import {HStack, Pressable, Text, VStack} from 'native-base';
import {BackRowBtnWidth, RowHeight} from '../../constants';

interface IProps {
  hasStatus: boolean;
  isNeedReply: boolean;
  hasPhoneNum: boolean;
  markReadBtnHandle?: () => void;
  approveBtnHandle?: () => void;
  rejectBtnHandle?: () => void;
  copyBtnHandle?: () => void;
}

const BackRow = ({
  hasStatus,
  isNeedReply,
  hasPhoneNum,
  markReadBtnHandle,
  approveBtnHandle,
  rejectBtnHandle,
  copyBtnHandle,
}: IProps) => {
  return (
    <HStack flex={1} h={RowHeight}>
      {hasStatus && (
        <Pressable
          onPress={markReadBtnHandle}
          position="absolute"
          left={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="orange.400"
          justifyContent="center"
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

      {isNeedReply && !hasPhoneNum && (
        <Pressable
          onPress={approveBtnHandle}
          position="absolute"
          right={BackRowBtnWidth}
          h={RowHeight}
          w={BackRowBtnWidth}
          bg="teal.500"
          justifyContent="center"
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

      {isNeedReply && !hasPhoneNum && (
        <Pressable
          onPress={rejectBtnHandle}
          position="absolute"
          right={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="rose.500"
          justifyContent="center"
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

      {!isNeedReply && hasPhoneNum && (
        <Pressable
          onPress={copyBtnHandle}
          position="absolute"
          right={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="teal.500"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              复制
            </Text>
          </VStack>
        </Pressable>
      )}
    </HStack>
  );
};

export default BackRow;
