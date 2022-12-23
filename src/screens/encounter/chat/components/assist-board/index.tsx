import {Box, Flex, Heading, HStack, Icon, Text, VStack} from 'native-base';
import {Animated, Pressable} from 'react-native';
import {AssistInfo} from '../../types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useCallback, useEffect, useRef, useState} from 'react';

const initTransY = -130;

interface IProps {}

const AssistBoard: React.FC<IProps> = () => {
  const [assistInfoList, setassistInfoList] = useState<AssistInfo[]>([
    {
      title: '世界杯冠军出炉',
      content:
        '是生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世',
    },
    {
      title: '世界杯冠军出炉',
      content:
        '是生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世',
    },
    {
      title: '世界杯冠军出炉',
      content:
        '是生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世生生世世',
    },
  ]);

  /** 动画相关 */
  const transYAnim = useRef(new Animated.Value(initTransY)).current;
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    toggle();
  }, []);

  const toggle = useCallback(() => {
    if (!isShow) {
      Animated.timing(transYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(transYAnim, {
        toValue: initTransY,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    setIsShow(flag => !flag);
  }, [isShow, transYAnim]);

  return (
    <Animated.View
      style={{
        opacity: 0.95,
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        transform: [{translateY: transYAnim}],
      }}>
      <Box
        h={130}
        px={4}
        py={3}
        bg="coolGray.50"
        _dark={{bg: 'dark.100'}}
        roundedBottom={25}
        shadow={1}>
        <Flex direction="row" justify="space-between">
          <HStack>
            <Icon
              as={Ionicon}
              name="bulb-outline"
              size="md"
              color="amber.300"
            />
            <Heading ml={2} size="sm">
              推荐话题
            </Heading>
          </HStack>
          <Icon as={Ionicon} name="refresh-outline" size="md" />
        </Flex>
        <VStack space={1} mt={3} alignSelf="center" w="80%">
          {assistInfoList.map((item, index) => (
            <Pressable key={index}>
              <Text>
                {index + 1}. {item.title}
              </Text>
            </Pressable>
          ))}
        </VStack>
      </Box>
      <Icon
        onPress={toggle}
        as={Ionicon}
        name="pin"
        size="xl"
        mr={4}
        alignSelf="flex-end"
        style={{transform: [{rotateX: '180 deg'}]}}
      />
    </Animated.View>
  );
};

export default AssistBoard;
