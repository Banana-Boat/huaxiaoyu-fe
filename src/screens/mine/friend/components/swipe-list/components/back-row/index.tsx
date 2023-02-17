import {HStack, Pressable, Text, VStack} from 'native-base';
import {
  LeftBackRowBtnWidth,
  RightBackRowBtnWidth,
  RowHeight,
} from '../../constants';

interface IProps {
  isNeedPhoneNumBtn: boolean;
  phoneNumBtnHandle: () => void;
  deleteBtnHandle: () => void;
}

const BackRow = ({
  isNeedPhoneNumBtn,
  phoneNumBtnHandle,
  deleteBtnHandle,
}: IProps) => {
  return (
    <HStack flex={1} h={RowHeight}>
      {isNeedPhoneNumBtn && (
        <Pressable
          onPress={phoneNumBtnHandle}
          position="absolute"
          left={0}
          w={LeftBackRowBtnWidth}
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

      <Pressable
        onPress={deleteBtnHandle}
        position="absolute"
        right={0}
        w={RightBackRowBtnWidth}
        h={RowHeight}
        bg="rose.500"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
            删除
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export default BackRow;
