import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  Pressable,
  SectionList,
  Text,
  Toast,
  useColorMode,
  VStack,
} from 'native-base';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useCallback, useEffect, useState} from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {removeData} from '~utils';
import userStore from '~stores/user/userStore';
import {observer} from 'mobx-react-lite';
import {getFriendList, getMessageList, getRecordList} from '../api';
import messageStore from '~stores/message/messageStore';
import friendStore from '~stores/friend/friendStore';

interface ISection {
  data: IOption[];
}

interface IOption {
  name: string;
  value?: string;
  icon: string;
  hasArrow: boolean;
  color?: ColorType;
  action?: () => void;
}

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /* 每次聚焦该页面，则获取三个列表 */
  useFocusEffect(
    useCallback(() => {
      getMessageList().catch(() =>
        Toast.show({description: '消息列表获取失败', duration: 2000}),
      );
      getFriendList().catch(() =>
        Toast.show({description: '朋友列表获取失败', duration: 2000}),
      );
      getRecordList().catch(() =>
        Toast.show({description: '消息记录列表获取失败', duration: 2000}),
      );
    }, []),
  );

  /** 选项列表 */
  const {colorMode, toggleColorMode} = useColorMode();
  const [optionList, setOptionList] = useState<ISection[]>([]);
  const [isShowAbout, setIsShowAbout] = useState(false);
  useEffect(() => {
    setOptionList([
      {
        data: [
          {
            name: '聊天记录',
            icon: 'chatbubbles',
            hasArrow: true,
            action: () => navigation.navigate('RecordScreen'),
          },
          {
            name: '个人信息',
            icon: 'person-circle',
            hasArrow: false,
            value: `${userStore.infoCompletation}%`,
            action: () => navigation.navigate('EditInfoScreen'),
          },
        ],
      },
      {
        data: [
          {
            name: '颜色主题',
            value: colorMode === 'dark' ? '深色模式' : '浅色模式',
            icon: 'contrast',
            hasArrow: false,
            action: () => toggleColorMode(),
          },
          {
            name: '系统设置',
            icon: 'settings-sharp',
            hasArrow: true,
            action: () =>
              Toast.show({description: '暂无内容...', duration: 2000}),
          },
          {
            name: '关于我们',
            icon: 'body',
            hasArrow: true,
            action: () => setIsShowAbout(true),
          },
        ],
      },
      {
        data: [
          {
            name: '退出登录',
            icon: 'log-out',
            color: 'red.400',
            hasArrow: true,
            action: async () => {
              await removeData('jwt');
              navigation.replace('StartScreen');
            },
          },
        ],
      },
    ]);
  }, [toggleColorMode, navigation, colorMode]);

  return (
    <PageContainer safeAreaTop={0} safeAreaBottom={0}>
      <Box h={220}>
        <Box
          roundedBottom={30}
          h={200}
          backgroundColor={{
            linearGradient: {
              colors: ['rose.100', 'pink.700'],
              start: [0, 3],
              end: [1, 0],
            },
          }}
        />
        <Image
          style={{
            opacity: 0.7,
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
            padding: 3,
            position: 'absolute',
            bottom: 0,
            left: 20,
            aspectRatio: 1,
            width: 100,
            height: 100,
          }}
          source={
            userStore.user.headPhoto
              ? {uri: userStore.user.headPhoto}
              : require('~assets/images/avatar.png')
          }
        />
        <Box
          style={{
            position: 'absolute',
            top: 130,
            left: 135,
          }}>
          <Heading size="md" color="coolGray.50">
            {userStore.user.nickname ?? 'Hust_宇航员'}
          </Heading>
          <Text color="coolGray.100">
            {userStore.departmentDict.find(
              item => item.code === userStore.user.departmentCode,
            )?.name ?? ''}
          </Text>
        </Box>
      </Box>

      <HStack mt={3} justifyContent="space-around">
        <Pressable onPress={() => navigation.navigate('MessageScreen')} w="50%">
          <HStack justifyContent="center">
            <Center>
              <Heading size="md">消息中心</Heading>
              <Text>{messageStore.receiveMsgList.length}</Text>
            </Center>
            {messageStore.unreadMsgNum !== 0 && (
              <Badge
                colorScheme="teal"
                variant="solid"
                position="absolute"
                top={-12}
                right={2}
                shadow={3}
                rounded="full"
                _text={{
                  fontSize: 11,
                }}>
                +{messageStore.unreadMsgNum}
              </Badge>
            )}
          </HStack>
        </Pressable>
        <Divider orientation="vertical" />
        <Pressable onPress={() => navigation.navigate('FriendScreen')} w="50%">
          <Center>
            <Heading size="md">朋友</Heading>
            <Text>{friendStore.friendList.length}</Text>
          </Center>
        </Pressable>
      </HStack>

      <Box mt={6}>
        <SectionList<IOption, ISection>
          sections={optionList}
          keyExtractor={(item, index) => item.name + index}
          renderSectionFooter={() => <Box mt={3} />}
          renderItem={({item, index}) => (
            <Pressable
              onPress={item.action}
              bg="coolGray.50"
              _dark={{bg: 'dark.100'}}>
              {index !== 0 && (
                <Divider ml={10} bg="coolGray.200" _dark={{bg: 'dark.200'}} />
              )}
              <HStack
                py={4}
                px={3}
                alignItems="center"
                justifyContent="space-between">
                <HStack alignItems="center">
                  <Icon
                    color={item.color}
                    name={item.icon}
                    as={IoniconsIcon}
                    size="md"
                  />
                  <Text color={item.color} ml={3}>
                    {item.name}
                  </Text>
                </HStack>
                <HStack>
                  <Text color="warmGray.500">{item.value ?? ''}</Text>
                  {item.hasArrow && (
                    <Icon
                      color={item.color}
                      as={IoniconsIcon}
                      name="chevron-forward"
                      size="md"
                    />
                  )}
                </HStack>
              </HStack>
            </Pressable>
          )}
        />
      </Box>

      <Modal isOpen={isShowAbout} onClose={() => setIsShowAbout(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>华小遇开发团队</Modal.Header>
          <Modal.Body>
            <VStack>
              <Text>后端开发———刘鑫</Text>
              <Text>前端开发 & 美工设计———向天歌</Text>
              <Text>产品策划———王华旦、刘沣文、陶永新</Text>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </PageContainer>
  );
};

export default observer(ProfileScreen);
