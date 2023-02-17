import {HStack, Pressable, Text, VStack} from 'native-base';
import {BackRowBtnWidth, RowHeight} from '../../constants';

interface IProps {
  isFriend: boolean;
  applyBtnHandle: () => void;
}

const BackRow = ({isFriend, applyBtnHandle}: IProps) => {
  return (
    <HStack flex={1} h={RowHeight}>
      {!isFriend && (
        <Pressable
          onPress={applyBtnHandle}
          position="absolute"
          right={0}
          w={BackRowBtnWidth}
          h={RowHeight}
          bg="orange.400"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Text fontSize="xs" fontWeight="medium" color="coolGray.100">
              申请好友
            </Text>
          </VStack>
        </Pressable>
      )}
    </HStack>
  );
};

export default BackRow;
