import {Box, Text} from 'native-base';
import PageContainer from '~components/page-container';

const HomeScreen = () => {
  return (
    <PageContainer safeAreaBottom={0}>
      <Box h="100%" justifyContent="space-between">
        <Text>Encounter/Home</Text>
        <Text>Encounter/Home</Text>
      </Box>
    </PageContainer>
  );
};

export default HomeScreen;
