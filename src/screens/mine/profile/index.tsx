import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, Box, Button, Image, Text} from 'native-base';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import {removeData} from '~utils';

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <PageContainer safeAreaTop={0}>
      <Box h={205}>
        <Box
          h={170}
          backgroundColor={{
            linearGradient: {
              colors: ['rose.100', 'pink.500'],
              start: [0, 1.5],
              end: [1, 0],
            },
          }}
        />
        <Image
          style={{
            opacity: 0.6,
            position: 'absolute',
            top: 10,
            right: 15,
            aspectRatio: 1,
            width: 90,
            height: 90,
          }}
          alt="logo"
          source={require('~assets/images/logo.png')}
        />
        <Avatar
          bg="coolGray.50"
          shadow={1}
          _dark={{bg: 'dark.100'}}
          style={{
            padding: 10,
            position: 'absolute',
            bottom: 0,
            left: 25,
            aspectRatio: 1,
            width: 100,
            height: 100,
          }}
          source={require('~assets/images/avatar.png')}
        />
      </Box>

      <Button
        mt={100}
        onPress={async () => {
          await removeData('userInfo');
          navigation.replace('StartScreen');
        }}
        colorScheme="teal">
        注销
      </Button>
    </PageContainer>
  );
};

export default ProfileScreen;
