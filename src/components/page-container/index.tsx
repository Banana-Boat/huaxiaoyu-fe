import {PropsWithChildren} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, Flex, Icon, Pressable, Text} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

/**
 * 深色模式： back->dark.50 fore->dark.100
 * 浅色模式： back->coolGray.100 fore->coolGray.50
 */

interface IProps extends PropsWithChildren {
  safeAreaTop?: number; // false不起作用，取消顶部空间直接传入0
  safeAreaBottom?: number;
  hasHeader?: boolean; // 是否带header
  title?: string; // header中的标题
  leftAction?: () => void; // 左侧icon点击事件，默认为返回上级
  rightAction?: () => void; // 右侧icon点击事件
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
      safeAreaBottom={safeAreaBottom}
      flex={1}
      bg="coolGray.100"
      _dark={{bg: 'dark.50'}}>
      <Flex
        safeAreaTop
        position="relative"
        zIndex={4}
        direction="row"
        justify="space-between"
        align="center"
        py={3}
        px={4}
        shadow={2}
        bg="coolGray.50"
        _dark={{bg: 'dark.100'}}>
        <Pressable onPress={leftAction ?? navigation.goBack}>
          <Icon
            as={Ionicon}
            name="chevron-back"
            size="xl"
            color="dark.100"
            _dark={{color: 'coolGray.200'}}
          />
        </Pressable>
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
      <Box flex={1}>{children}</Box>
    </Box>
  ) : (
    <Box
      safeArea
      safeAreaTop={safeAreaTop}
      safeAreaBottom={safeAreaBottom}
      flex={1}
      bg="coolGray.100"
      _dark={{bg: 'dark.50'}}>
      {children}
    </Box>
  );
};

export default PageContainer;
