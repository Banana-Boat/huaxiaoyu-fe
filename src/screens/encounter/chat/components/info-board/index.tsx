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
import FriendApplyModal from './components/friend-apply-modal';
import {FriendApplyResultType} from '~stores/chat/types';
import FriendResultModal from './components/friend-result-modal';

interface IProps {
  topicList: ITopic[];
}

const InfoBoard: React.FC<IProps> = ({topicList}) => {
  const [isRecommend, setIsRecommend] = useState(true); // 展板信息类型（推荐话题 or 聊天者信息）

  /** 推荐话题相关 */
  const [batchIdx, setBatchIdx] = useState(0);
  const refreshTopicBatch = useCallback(() => {
    setBatchIdx(
      idx => (idx + 1) % Math.ceil(topicList.length / topicBatchSize),
    );
  }, [topicList]);

  /** 对方信息面板 */
  const [department, setDepartment] = useState('');
  const [interestList, setInterestList] = useState<string[]>([]);
  const [isFriendApplyBtnDisabled, setIsFriendApplyBtnDisabled] =
    useState(false); // 好友申请按钮是否被禁用
  const [friendApplyBtnText, setFriendApplyBtnText] = useState('交个朋友');

  useEffect(() => {
    if (chatStore.opponent.isFriend) {
      setFriendApplyBtnText('已是好友');
      setIsFriendApplyBtnDisabled(true);
      return;
    }

    switch (chatStore.friendApplyResult) {
      case FriendApplyResultType.PENDING:
        setFriendApplyBtnText('等待回复..');
        setIsFriendApplyBtnDisabled(true);
        break;
      case FriendApplyResultType.SUCCESS:
        setFriendApplyBtnText('已是好友');
        setIsFriendApplyBtnDisabled(true);
        break;
      default:
        setFriendApplyBtnText('交个朋友');
        setIsFriendApplyBtnDisabled(false);
    }
  }, [chatStore.friendApplyResult, chatStore.opponent]);

  /** 动画相关 */
  const transYAnim = useRef(new Animated.Value(-boardHeight)).current;
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    toggle();

    if (chatStore.opponent.departmentCode) {
      const {departmentCode} = chatStore.opponent;
      const res = userStore.getDepartmentName(departmentCode);
      if (res) setDepartment(res);
    }

    if (chatStore.opponent.interestCodeList) {
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
      {/* 朋友申请弹窗 */}
      <FriendApplyModal
        isOpen={
          !chatStore.isFriendApplySender &&
          chatStore.friendApplyResult === FriendApplyResultType.PENDING
        }
        approve={() => {
          chatStore.sendFriendReply(FriendApplyResultType.SUCCESS);
        }}
        reject={() => {
          chatStore.sendFriendReply(FriendApplyResultType.FAIL);
        }}
      />

      {/* 朋友申请结果弹窗 */}
      <FriendResultModal
        isOpen={
          chatStore.isFriendApplySender &&
          (chatStore.friendApplyResult === FriendApplyResultType.SUCCESS ||
            chatStore.friendApplyResult === FriendApplyResultType.FAIL)
        }
        result={chatStore.friendApplyResult}
        close={() => {
          if (chatStore.friendApplyResult === FriendApplyResultType.FAIL)
            chatStore.resetFriendApplyInfo();
          else chatStore.updateIsFriendApplySender(false);
        }}
      />

      <Box
        h={boardHeight}
        px={4}
        py={3}
        bg="coolGray.50"
        _dark={{bg: 'dark.100'}}
        roundedBottom={25}
        shadow={1}>
        {isRecommend ? (
          /* 推荐话题面板 */
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
            <VStack space="0.5" mt="2" px={5}>
              <ScrollView mb={4}>
                {topicList
                  .slice(
                    topicBatchSize * batchIdx,
                    topicBatchSize * (batchIdx + 1),
                  )
                  .map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => chatStore.sendTopicMessage(item)}>
                      <HStack>
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
          /* 对方信息面板 */
          <VStack space={1} px={5}>
            <HStack
              mb={2}
              pl={10}
              justifyContent="space-between"
              alignItems="center">
              <Avatar.Group _avatar={{size: 'md'}}>
                <Avatar
                  source={
                    chatStore.opponent.headPhoto
                      ? {uri: chatStore.opponent.headPhoto}
                      : require('~assets/images/avatar.png')
                  }
                />
                <Avatar
                  source={
                    userStore.user.headPhoto
                      ? {uri: userStore.user.headPhoto}
                      : require('~assets/images/avatar.png')
                  }
                />
              </Avatar.Group>
              <Button
                onPress={() => {
                  chatStore.sendFriendApply();
                  Toast.show({
                    description: '好友申请已发出，等待回复',
                    duration: 2000,
                  });
                }}
                isDisabled={isFriendApplyBtnDisabled}
                leftIcon={<Icon as={Ionicon} name="heart" />}
                variant="solid"
                height={9}
                size="sm"
                rounded={30}
                colorScheme="pink">
                {friendApplyBtnText}
              </Button>
            </HStack>
            {department && chatStore.opponent.sex && (
              <HStack>
                <Text
                  color={
                    chatStore.opponent.sex === SexType.MALE
                      ? 'lightBlue.500'
                      : 'pink.500'
                  }>
                  {chatStore.opponent.sex === SexType.MALE ? '他' : '她'}
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

      {/* 切换拉杆 */}
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
