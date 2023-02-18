import {HStack, Pressable, Text, VStack} from 'native-base';
import {
  BackRowLeftBtnWidth,
  BackRowRightBtnWidth,
  RowHeight,
} from '../../constants';

interface IProps {
  hasPhoneNum: boolean;
  applyBtnHandle: () => void;
  deleteBtnHandle: () => void;
  copyBtnHandle: () => void;
}

const BackRow = ({
  hasPhoneNum,
  applyBtnHandle,
  deleteBtnHandle,
  copyBtnHandle,
}: IProps) => {
  return (
    <HStack flex={1} h={RowHeight}>
      {!hasPhoneNum && (
        <Pressable
          onPress={applyBtnHandle}
          position="absolute"
          left={0}
          w={BackRowLeftBtnWidth}
          h={RowHeight}
          bg="orange.400"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              索要联系方式
            </Text>
          </VStack>
        </Pressable>
      )}

      {hasPhoneNum && (
        <Pressable
          onPress={copyBtnHandle}
          position="absolute"
          right={BackRowRightBtnWidth}
          w={BackRowRightBtnWidth}
          h={RowHeight}
          bg="teal.400"
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
      <Pressable
        onPress={deleteBtnHandle}
        position="absolute"
        right={0}
        w={BackRowRightBtnWidth}
        h={RowHeight}
        bg="rose.500"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
            删除好友
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default BackRow;
