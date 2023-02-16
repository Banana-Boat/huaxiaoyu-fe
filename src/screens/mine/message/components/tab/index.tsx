import {HStack, Pressable, Text, useColorModeValue} from 'native-base';
import {TabType} from '../../types';

interface IProps {
  curTab: TabType;
  toggleTab: (tab: TabType) => void;
}

const Tab = ({curTab, toggleTab}: IProps) => {
  const inactiveBorderColor = useColorModeValue('gray.300', 'gray.500');

  return (
    <HStack w="100%" mb={2} h={50}>
      <Pressable
        onPress={() => toggleTab(TabType.RECEIVE)}
        borderColor={
          curTab === TabType.RECEIVE ? 'pink.500' : inactiveBorderColor
        }
        w="50%"
        justifyContent="center"
        alignItems="center"
        borderBottomWidth={3}>
        <Text color={curTab === TabType.RECEIVE ? 'pink.500' : 'coolGray.400'}>
          接 收
        </Text>
      </Pressable>
      <Pressable
        onPress={() => toggleTab(TabType.SEND)}
        borderColor={curTab === TabType.SEND ? 'pink.500' : inactiveBorderColor}
        w="50%"
        justifyContent="center"
        alignItems="center"
        borderBottomWidth={3}>
        <Text color={curTab === TabType.SEND ? 'pink.500' : 'coolGray.400'}>
          发 送
        </Text>
      </Pressable>
    </HStack>
  );
};

export default Tab;
