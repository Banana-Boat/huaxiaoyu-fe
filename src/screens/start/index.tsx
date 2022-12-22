import {Flex, Box, Heading, Pressable, ZStack} from 'native-base';
import {useCallback, useRef, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import PageContainer from '~components/page-container';
import Login from './components/login';
import Register from './components/register';

/** Logo相关参数 */
const {width: screenWidth} = Dimensions.get('window');
const logoLeftOfLogin = screenWidth * 0.5 - 70;
const logoLeftOfRegister = 20;
const logoWidthOfLogin = 140;
const logoWidthOfRegister = 80;

const StartScreen = () => {
  /** 页面状态相关 */
  const [screenMode, setScreenMode] = useState<'register' | 'login'>('login');
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

  /** 动画相关 */
  const positionXAnim = useRef(new Animated.Value(logoLeftOfLogin)).current;
  const scaleAnim = useRef(new Animated.Value(logoWidthOfLogin)).current;
  const registerOpacityAnim = useRef(new Animated.Value(0)).current;
  const loginOpacityAnim = useRef(new Animated.Value(1)).current;

  const animToRegister = useCallback(() => {
    Animated.timing(positionXAnim, {
      toValue: logoLeftOfRegister,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: logoWidthOfRegister,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(registerOpacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    loginOpacityAnim.setValue(0);
  }, []);

  const animToLogin = useCallback(() => {
    Animated.timing(positionXAnim, {
      toValue: logoLeftOfLogin,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: logoWidthOfLogin,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(loginOpacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    registerOpacityAnim.setValue(0);
  }, []);

  return (
    <PageContainer>
      <Flex py={2} w="100%" h="100%" justify="space-between">
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
                  left: logoLeftOfRegister + logoWidthOfRegister + 5,
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
        <ZStack mt={2} flex={1} reversed={screenMode === 'register'}>
          <Animated.View
            style={{
              opacity: registerOpacityAnim,
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Register />
          </Animated.View>
          <Animated.View
            style={{
              opacity: loginOpacityAnim,
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Login toggleScreenMode={toggleScreenMode} />
          </Animated.View>
        </ZStack>
      </Flex>
    </PageContainer>
  );
};

export default StartScreen;
