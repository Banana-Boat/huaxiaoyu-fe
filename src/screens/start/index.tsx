import {
  Center,
  Image,
  Flex,
  Box,
  HStack,
  Heading,
  Button,
  Pressable,
} from 'native-base';
import {useRef, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import Login from './components/login';
import Register from './components/register';

const {width: screenWidth} = Dimensions.get('window');
const logoInitialLeft = screenWidth * 0.43 - 70;

const StartScreen = () => {
  const [screenMode, setScreenMode] = useState<'register' | 'login'>('login');

  const positionXAnim = useRef(new Animated.Value(logoInitialLeft)).current;
  const scaleAnim = useRef(new Animated.Value(140)).current;
  const registerOpacityAnim = useRef(new Animated.Value(0)).current;
  const loginOpacityAnim = useRef(new Animated.Value(1)).current;

  const animToRegister = () => {
    Animated.timing(positionXAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: 80,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(registerOpacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
    loginOpacityAnim.setValue(0);
  };

  const animToLogin = () => {
    Animated.timing(positionXAnim, {
      toValue: logoInitialLeft,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: 140,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(loginOpacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
    registerOpacityAnim.setValue(0);
  };

  const toggleScreenMode = () => {
    setScreenMode(val => {
      if (val === 'login') {
        animToRegister();
        return 'register';
      } else {
        animToLogin();
        return 'login';
      }
    });
  };

  return (
    <Center
      w="100%"
      h="100%"
      _dark={{
        bg: 'dark.50',
      }}>
      <Flex safeArea py={2} w="86%" h="100%" justify="space-between">
        <Pressable onPress={toggleScreenMode}>
          <Animated.View
            style={{
              height: scaleAnim,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.Image
              source={require('~assets/images/logo.png')}
              style={{
                position: 'absolute',
                left: positionXAnim,
                alignSelf: 'center',
                height: scaleAnim,
                width: scaleAnim,
                aspectRatio: 1,
              }}
            />
            {screenMode === 'register' && (
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 88,
                  opacity: registerOpacityAnim,
                }}>
                <Heading
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  fontWeight="medium"
                  size="xl">
                  注册
                </Heading>
              </Animated.View>
            )}
          </Animated.View>
        </Pressable>
        <Box mt={2} flex={1}>
          {screenMode === 'login' ? (
            <Login
              opacity={loginOpacityAnim}
              toggleScreenMode={toggleScreenMode}
            />
          ) : (
            <Register opacity={registerOpacityAnim} />
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default StartScreen;
