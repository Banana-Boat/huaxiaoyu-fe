import {Box} from 'native-base';
import {PropsWithChildren} from 'react';

const PageContainer: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  return <Box>{children}</Box>;
};

export default PageContainer;
