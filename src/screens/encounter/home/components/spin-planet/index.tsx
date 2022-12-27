import {Avatar, Box, Flex, View} from 'native-base';
import {useEffect, useRef, useState} from 'react';
import {Animated, Image, Text} from 'react-native';
import chatStore from '~stores/chat/chatStore';
import {ChatStateType} from '~stores/chat/types';
import {IUser, SexType} from '~stores/user/types';
import {
  avatarPositionList,
  colorOfPlanet,
  colorOfRing1,
  colorOfRing2,
  planetWidth,
  ring2Width,
  ringWidth,
  starPositionList,
} from './constants';
import {getRandomIndex} from './utils';

interface IProps {
  userInfoList: IUser[];
}

const SpinPlanet: React.FC<IProps> = ({userInfoList}) => {
  const ringRotateAnim = useRef(new Animated.Value(0)).current;
  const planetRotateAnim = useRef(new Animated.Value(0)).current;
  const avatar1OffsetAnim = useRef(new Animated.Value(0)).current;
  const avatar1OpacityAnim = useRef(new Animated.Value(0)).current;
  const avatar2OffsetAnim = useRef(new Animated.Value(0)).current;
  const avatar2OpacityAnim = useRef(new Animated.Value(0)).current;

  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [randomIndexList, setRandomIndexList] = useState<number[]>([]);

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(ringRotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(planetRotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),

          Animated.timing(planetRotateAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    if (chatStore.state === ChatStateType.MATCHING && userInfoList.length > 0) {
      setRandomIndexList(getRandomIndex(userInfoList.length, 5));
      setTimer(
        setInterval(() => {
          setRandomIndexList(getRandomIndex(userInfoList.length, 5));
        }, 3500),
      );

      Animated.loop(
        Animated.stagger(500, [
          Animated.parallel([
            Animated.sequence([
              Animated.timing(avatar1OffsetAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(avatar1OffsetAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(avatar1OpacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(avatar1OpacityAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.parallel([
            Animated.sequence([
              Animated.timing(avatar2OffsetAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(avatar2OffsetAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(avatar2OpacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(avatar2OpacityAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]),
      ).start();
    } else {
      clearInterval(timer);

      avatar1OffsetAnim.setValue(0);
      avatar1OpacityAnim.setValue(0);
      avatar2OffsetAnim.setValue(0);
      avatar2OpacityAnim.setValue(0);
    }
  }, [chatStore.state, userInfoList]);

  return (
    <Flex position="relative" w="100%" h="100%" justify="center" align="center">
      {/* avatar */}
      {chatStore.state === ChatStateType.MATCHING &&
        avatarPositionList.map(([left, top, flag], index) => (
          <Animated.View
            key={index}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              opacity: flag === 1 ? avatar1OpacityAnim : avatar2OpacityAnim,
              transform: [
                {
                  translateY:
                    flag === 1
                      ? avatar1OpacityAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -20],
                        })
                      : avatar2OpacityAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -15],
                        }),
                },
              ],
              alignItems: 'center',
            }}>
            <Box
              rounded={50}
              p={0.5}
              mb={1}
              bg={
                userInfoList[randomIndexList[index]]?.sex === SexType.FEMALE
                  ? 'pink.400'
                  : 'lightBlue.700'
              }>
              <Image
                style={{width: 50, height: 50, borderRadius: 50}}
                source={
                  userInfoList[randomIndexList[index]]?.headPhoto
                    ? {url: userInfoList[randomIndexList[index]]?.headPhoto}
                    : require('~assets/images/avatar2.png')
                }
              />
            </Box>
            <Text style={{color: '#e5e7eb', fontSize: 12}}>
              {userInfoList[randomIndexList[index]]?.nickname}
            </Text>
          </Animated.View>
        ))}

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
      {/* star */}
      {starPositionList.map(([left, top], index) => (
        <Box
          key={left + top}
          bg="orange.50"
          position="absolute"
          h={0.8}
          w={0.8}
          left={left}
          top={top}
        />
      ))}
    </Flex>
  );
};

export default SpinPlanet;
