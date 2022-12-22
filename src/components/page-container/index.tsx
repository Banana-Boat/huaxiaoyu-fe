import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, Flex, Icon, Text} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IProps extends PropsWithChildren {
  safeAreaTop?: number; // false不起作用，取消顶部空间直接传入0
  safeAreaBottom?: number;
  hasHeader?: boolean; // 是否带header
  title?: string;
  leftAction?: () => void;
  rightAction?: () => void;
}

const PageContainer: React.FC<IProps> = ({
  safeAreaTop = true,
  safeAreaBottom = true,
  hasHeader = false,
  title,
  leftAction,
  rightAction,
  children,
}) => {
  const navigation = useNavigation();

  return hasHeader ? (
    <Box
      safeAreaBottom
      h="100%"
      w="100%"
      flex={1}
      bg="coolGray.100"
      _dark={{bg: 'dark.50'}}>
      <Flex
        safeAreaTop
        direction="row"
        justify="space-between"
        align="center"
        py={3}
        px={4}
        shadow={2}
        bg="coolGray.50"
        _dark={{bg: 'dark.100'}}>
        <Icon
          onPress={leftAction ?? navigation.goBack}
          as={Ionicon}
          name="chevron-back"
          size="xl"
          color="dark.100"
          _dark={{color: 'coolGray.200'}}
        />
        <Text fontSize="md" color="dark.100" _dark={{color: 'coolGray.50'}}>
          {title}
        </Text>
        <Icon
          opacity={rightAction ? 1 : 0}
          onPress={rightAction}
          as={Ionicon}
          name="ellipsis-vertical"
          size="lg"
          color="dark.100"
          _dark={{color: 'coolGray.200'}}
        />
      </Flex>
      <Box>{children}</Box>
    </Box>
  ) : (
    <Box
      safeArea
      safeAreaTop={safeAreaTop}
      safeAreaBottom={safeAreaBottom}
      h="100%"
      w="100%"
      flex={1}
      bg="coolGray.100"
      _dark={{bg: 'dark.50'}}>
      {children}
    </Box>
  );
};

export default PageContainer;
