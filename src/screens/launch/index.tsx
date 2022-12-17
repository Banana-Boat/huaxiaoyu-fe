import {Box, Center} from 'native-base';
import {Image} from 'react-native';

const LaunchScreen = () => {
  return (
    <Center
      safeArea
      h="100%"
      w="100%"
      _dark={{
        bg: 'dark.50',
      }}>
      <Image
        source={require('~assets/images/logo.png')}
        style={{
          height: 200,
          width: 200,
          aspectRatio: 1,
        }}
      />
    </Center>
  );
};

export default LaunchScreen;
