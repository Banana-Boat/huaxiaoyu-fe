import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Text,
  Input,
  WarningOutlineIcon,
  IconButton,
  SunIcon,
  MoonIcon,
  Toast,
} from 'native-base';
import {memo, useCallback, useState} from 'react';
import {RootStackParamList} from '~routes/router';
import {useColorMode} from 'native-base';
import {login} from './api';

interface IProps {
  toggleScreenMode: () => void;
}

const Login = memo<IProps>(({toggleScreenMode}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {colorMode, toggleColorMode} = useColorMode();

  // 表单
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginBtnPressHandle = useCallback(async () => {
    if (!password || !username)
      return Toast.show({description: '信息填写有误', duration: 2000});

    try {
      const res = await login({username, password});
      if (res) navigation.replace('Main');
    } catch (error) {
      Toast.show({description: '登录失败', duration: 2000});
    }
  }, [password, username]);

  // 错误处理
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  return (
    <>
      <Box px={6}>
        <Center>
          <Heading
            size="2xl"
            fontWeight="bold"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            华小遇
          </Heading>
          <Heading
            style={{alignSelf: 'center'}}
            mt={1}
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            ——遇见来自华科的你——
          </Heading>
        </Center>

        <Center mt={8}>
          <FormControl isInvalid={usernameErrorMsg !== ''}>
            <Input
              value={username}
              onChangeText={text => setUsername(text)}
              onBlur={() => {
                if (!username) setUsernameErrorMsg('用户名不可为空');
                else setUsernameErrorMsg('');
              }}
              size="lg"
              variant="underlined"
              placeholder="用户名"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {usernameErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordErrorMsg !== ''}>
            <Input
              value={password}
              onChangeText={text => setPassword(text)}
              onBlur={() => {
                if (!password) setPasswordErrorMsg('密码不可为空');
                else setPasswordErrorMsg('');
              }}
              type="password"
              size="lg"
              mt={4}
              variant="underlined"
              placeholder="密码"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {passwordErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={loginBtnPressHandle}
            mt={10}
            size="md"
            borderRadius="3xl"
            w="70%"
            colorScheme="pink"
            shadow={1}>
            登 录
          </Button>
          <HStack mt={5} justifyContent="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="medium">
              还未注册账号？
            </Text>
            <Text onPress={toggleScreenMode} bold underline color="pink.600">
              点击注册
            </Text>
          </HStack>
        </Center>
      </Box>

      <Box justifyContent="center" alignItems="center">
        <IconButton
          onPress={toggleColorMode}
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          rounded="full"
          colorScheme="pink"
        />
      </Box>
    </>
  );
});
export default Login;
