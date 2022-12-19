import {Box} from 'native-base';
import {PropsWithChildren} from 'react';

interface IProps extends PropsWithChildren {
  safeAreaTop?: number; // false不起作用，取消顶部空间直接传入0
  safeAreaBottom?: number;
}

const PageContainer: React.FC<IProps> = ({
  safeAreaTop = true,
  safeAreaBottom = true,
  children,
}) => {
  return (
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
