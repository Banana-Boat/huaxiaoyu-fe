import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Avatar,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  SectionList,
  Text,
  Toast,
  useColorMode,
} from 'native-base';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {removeData} from '~utils';
import userStore from '~stores/user/userStore';

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

  /** 计算个人信息完成度 */
  const [infoCompletation, setInfoCompletation] = useState('0');
  useEffect(() => {
    const {user} = userStore;
    let completedNum = 0,
      total = 0;

    Object.entries(user).forEach(([key, val]) => {
      if (
        key === 'id' ||
        key === 'username' ||
        key === 'headPhoto' ||
        key === 'nickname'
      )
        return;

      total++;
      if (!val) completedNum++;
    });

    setInfoCompletation(((completedNum / total) * 100).toFixed());
  }, [userStore]);

  /** 选项列表 */
  const {colorMode, toggleColorMode} = useColorMode();
  const [optionList, setOptionList] = useState<ISection[]>([]);
  useEffect(() => {
    setOptionList([
      {
        data: [
          {
            name: '聊天记录',
            icon: 'chatbubbles',
            hasArrow: true,
            action: () =>
              Toast.show({description: '功能建设中...', duration: 2000}),
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
              Toast.show({description: '功能建设中...', duration: 2000}),
          },
          {
            name: '关于我们',
            icon: 'body',
            hasArrow: true,
            action: () =>
              Toast.show({description: '功能建设中...', duration: 2000}),
          },
        ],
      },
      {
        data: [
          {
            name: '退出登录',
            icon: 'log-out',
            color: 'rose.400',
            hasArrow: true,
            action: async () => {
              await removeData('userInfo');
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
            padding: 5,
            position: 'absolute',
            bottom: 0,
            left: 20,
            aspectRatio: 1,
            width: 100,
            height: 100,
          }}
          source={
            userStore.user.headPhoto ?? require('~assets/images/avatar2.png')
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
        <Pressable
          onPress={() =>
            Toast.show({description: '功能建设中...', duration: 2000})
          }
          w="50%">
          <Center>
            <Heading size="md">朋友</Heading>
            <Text>100</Text>
          </Center>
        </Pressable>
        <Divider orientation="vertical" />
        <Pressable
          onPress={() => navigation.navigate('EditInfoScreen')}
          w="50%">
          <Center>
            <Heading size="md">个人信息</Heading>
            <Text>{infoCompletation}%</Text>
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
    </PageContainer>
  );
};

export default ProfileScreen;
