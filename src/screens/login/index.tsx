import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, Button} from 'native-base';
import {RootStackParamList} from '~routes/router';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Box safeArea>
      <Button onPress={() => navigation.navigate('BottomTab')}>登录</Button>
    </Box>
  );
};

export default LoginScreen;
