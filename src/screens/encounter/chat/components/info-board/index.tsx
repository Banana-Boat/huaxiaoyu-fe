import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  Toast,
  VStack,
} from 'native-base';
import {Animated} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useCallback, useEffect, useRef, useState} from 'react';
import {boardHeight, ColorDict, topicBatchSize} from './types';
import userStore from '~stores/user/userStore';
import chatStore from '~stores/chat/chatStore';
import {SexType} from '~stores/user/types';
import {observer} from 'mobx-react-lite';
import {ITopic} from '../../types';

interface IProps {
  topicList: ITopic[];
}

const InfoBoard: React.FC<IProps> = ({topicList}) => {
  const [isRecommend, setIsRecommend] = useState(false); // 展板信息类型（推荐话题 or 聊天者信息）

  /** 推荐话题相关 */
  const [batchIdx, setBatchIdx] = useState(0);
  const refreshTopicBatch = useCallback(() => {
    setBatchIdx(
      idx => (idx + 1) % Math.ceil(topicList.length / topicBatchSize),
    );
  }, [topicList]);

  /** 聊天对象信息相关 */
  const [department, setDepartment] = useState('');
  const [interestList, setInterestList] = useState<string[]>([]);

  /** 动画相关 */
  const transYAnim = useRef(new Animated.Value(-boardHeight)).current;
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    toggle();

    if (chatStore.opponent?.departmentCode) {
      const {departmentCode} = chatStore.opponent;
      const res = userStore.getDepartmentName(departmentCode);
      if (res) setDepartment(res);
    }

    if (chatStore.opponent?.interestCodeList) {
      const {interestCodeList} = chatStore.opponent;
      const res = userStore.getInterestNameList(interestCodeList);
      // 如果兴趣不为空，截取前五个展示
      if (res.length) setInterestList(res.slice(0, 5));
    }
  }, [chatStore.opponent]);

  const toggle = useCallback(() => {
    if (!isShow) {
      Animated.timing(transYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setIsRecommend(flag => !flag);
    } else {
      Animated.timing(transYAnim, {
        toValue: -boardHeight,
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
        h={boardHeight}
        px={4}
        py={3}
        bg="coolGray.50"
        _dark={{bg: 'dark.100'}}
        roundedBottom={25}
        shadow={1}>
        {isRecommend ? (
          <>
            <HStack justifyContent="space-between">
              <HStack alignItems="center">
                <Icon
                  as={Ionicon}
                  name="bulb-outline"
                  size="md"
                  color="amber.300"
                />
                <Heading ml={2} size="sm">
                  推荐话题
                </Heading>
                <Text fontSize={12}>（点击一个话题打开话匣子吧）</Text>
              </HStack>
              <Pressable onPress={refreshTopicBatch}>
                <Icon as={Ionicon} name="refresh-outline" size="md" />
              </Pressable>
            </HStack>
            <VStack space="0.5" mt="2" alignSelf="center">
              <ScrollView w="85%" mb={4}>
                {topicList
                  .slice(
                    topicBatchSize * batchIdx,
                    topicBatchSize * (batchIdx + 1),
                  )
                  .map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => chatStore.sendTopicMessage(item)}>
                      <HStack alignItems="center">
                        <Button
                          w="auto"
                          isPressed={false}
                          colorScheme={ColorDict[index]}
                          variant="outline"
                          rounded={5}
                          h={5}
                          px={1}
                          py={0}
                          mr={2}
                          size="xs">
                          {item.type}
                        </Button>
                        <Text>{item.title}</Text>
                      </HStack>
                    </Pressable>
                  ))}
              </ScrollView>
            </VStack>
          </>
        ) : (
          <VStack space={1} px={5}>
            <HStack
              mb={2}
              pl={10}
              justifyContent="space-between"
              alignItems="center">
              <Avatar.Group _avatar={{size: 'md'}}>
                <Avatar
                  source={
                    chatStore.opponent?.headPhoto
                      ? {uri: chatStore.opponent.headPhoto}
                      : require('~assets/images/avatar2.png')
                  }
                />
                <Avatar
                  source={
                    userStore.user.headPhoto
                      ? {uri: userStore.user.headPhoto}
                      : require('~assets/images/avatar2.png')
                  }
                />
              </Avatar.Group>
              <Button
                onPress={() =>
                  Toast.show({description: '功能建设中...', duration: 2000})
                }
                leftIcon={<Icon as={Ionicon} name="heart" />}
                variant="solid"
                height={9}
                size="sm"
                rounded={30}
                colorScheme="pink">
                交个朋友
              </Button>
            </HStack>
            {department && chatStore.opponent?.sex && (
              <HStack>
                <Text
                  color={
                    chatStore.opponent?.sex === SexType.MALE
                      ? 'lightBlue.500'
                      : 'pink.500'
                  }>
                  {chatStore.opponent?.sex === SexType.MALE ? '他' : '她'}
                </Text>
                <Text>
                  &nbsp;&nbsp;来自
                  {department}
                </Text>
              </HStack>
            )}
            {interestList.length !== 0 && (
              <HStack alignItems="center">
                <Text mr={2}>兴趣爱好是</Text>
                {interestList.map((name, index) => (
                  <Button
                    isPressed={false}
                    key={name}
                    colorScheme={ColorDict[index]}
                    variant="outline"
                    rounded={5}
                    h={5}
                    px={1}
                    py={0}
                    mx={1}
                    size="xs"
                    w="auto">
                    {name}
                  </Button>
                ))}
              </HStack>
            )}
          </VStack>
        )}
      </Box>
      <Pressable onPress={toggle}>
        <Icon
          as={Ionicon}
          name="pin"
          size="xl"
          mr={4}
          alignSelf="flex-end"
          style={{transform: [{rotateX: '180 deg'}]}}
        />
      </Pressable>
    </Animated.View>
  );
};

export default observer(InfoBoard);
