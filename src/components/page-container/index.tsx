import {Box} from 'native-base';
import {PropsWithChildren} from 'react';

const PageContainer: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  return (
    <Box paddingX={2} paddingY={4}>
      {children}
    </Box>
  );
};

export default PageContainer;
