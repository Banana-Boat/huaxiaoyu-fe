import {Box, Flex, Text, View} from 'native-base';
import {useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const planetWidth = screenWidth * 0.3;
const ringWidth = screenWidth * 0.45;
const ring2Width = screenWidth * 0.4;
const colorOfPlanet = '#E75582';
const colorOfRing1 = '#EC90AD';
const colorOfRing2 = '#F5C6D6';

const SpinPlanet = () => {
  const ringRotateAnim = useRef(new Animated.Value(0)).current;
  const planetRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(ringRotateAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(planetRotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),

          Animated.timing(planetRotateAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Flex position="relative" justify="center" align="center">
      {/* planet */}
      <Animated.View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: planetWidth,
          height: planetWidth,
          borderRadius: 180,
          backgroundColor: colorOfPlanet,
          transform: [
            {
              rotateZ: planetRotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['-10deg', '10deg'],
              }),
            },
          ],
        }}>
        {/* ring */}
        <Animated.View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
            width: ringWidth,
            height: ringWidth,
            borderRadius: ringWidth,
            backgroundColor: colorOfRing2,
            transform: [
              {
                rotateX: '110deg',
              },
              {
                rotateZ: ringRotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {
                translateX: -8,
              },
              {
                translateY: 5,
              },
            ],
          }}>
          {/* ring2 */}
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: ring2Width,
              height: ring2Width,
              borderRadius: ring2Width,
              overflow: 'hidden',
              backgroundColor: colorOfRing1,
            }}
          />
        </Animated.View>

        {/* patch-ring */}
        <View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 500,
            width: planetWidth,
            height: planetWidth,
            borderRadius: planetWidth,
            transform: [{rotateX: '110deg'}],
            backgroundColor: colorOfPlanet,
          }}
        />
        <View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 500,
            width: planetWidth,
            height: planetWidth / 2,
            borderTopLeftRadius: planetWidth,
            borderTopRightRadius: planetWidth,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transform: [{translateY: -30}],
            backgroundColor: colorOfPlanet,
          }}
        />
      </Animated.View>
    </Flex>
  );
};

export default SpinPlanet;
