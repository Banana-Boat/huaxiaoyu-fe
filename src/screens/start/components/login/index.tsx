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
  Flex,
  SunIcon,
  MoonIcon,
} from 'native-base';
import {useState} from 'react';
import {RootStackParamList} from '~routes/router';
import {useColorMode} from 'native-base';
import {Animated} from 'react-native';

interface IProps {
  toggleScreenMode: () => any;
  opacity: Animated.Value;
}

const Login: React.FC<IProps> = ({toggleScreenMode, opacity}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {colorMode, toggleColorMode} = useColorMode();

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  return (
    <Animated.View
      style={{
        opacity: opacity,
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <Box>
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
            <Input size="lg" variant="underlined" placeholder="用户名" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {usernameErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordErrorMsg !== ''}>
            <Input
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
            onPress={() => navigation.navigate('BottomTab')}
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
          shadow={1}
          colorScheme="pink"
        />
      </Box>
    </Animated.View>
  );
};

export default Login;
