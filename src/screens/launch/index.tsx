import {Center, PresenceTransition} from 'native-base';
import {Image} from 'react-native';
import PageContainer from '~components/page-container';

const LaunchScreen = () => {
  return (
    <PageContainer safeAreaTop={0} safeAreaBottom={0}>
      <Center flex={1}>
        <PresenceTransition
          visible
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 600,
            },
          }}>
          <Image
            source={require('~assets/images/logo.png')}
            style={{
              height: 200,
              width: 200,
              aspectRatio: 1,
            }}
          />
        </PresenceTransition>
      </Center>
    </PageContainer>
  );
};

export default LaunchScreen;
