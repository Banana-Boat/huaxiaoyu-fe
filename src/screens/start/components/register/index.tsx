import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  WarningOutlineIcon,
  Flex,
} from 'native-base';
import {useState} from 'react';
import {Animated} from 'react-native';
import {RootStackParamList} from '~routes/router';

interface IProps {
  opacity: Animated.Value;
}

const Register: React.FC<IProps> = ({opacity}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  return (
    <Animated.View
      style={{
        opacity: opacity,
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <Center mt={8}>
        <FormControl isInvalid={usernameErrorMsg !== ''}>
          <Input size="lg" variant="underlined" placeholder="用户名" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
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
          注 册
        </Button>
      </Center>
    </Animated.View>
  );
};

export default Register;
