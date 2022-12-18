import {Box} from 'native-base';
import {PropsWithChildren} from 'react';

const PageContainer: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  return (
    <Box safeArea h="100%" _dark={{backgroundColor: '#18181b'}}>
      {children}
    </Box>
  );
};

export default PageContainer;
