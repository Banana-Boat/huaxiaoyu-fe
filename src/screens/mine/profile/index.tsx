import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, Button, Text} from 'native-base';
import {RootStackParamList} from '~routes/router';
import {removeData} from '~utils';

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Box safeArea>
      <Button
        onPress={async () => {
          await removeData('userInfo');
          navigation.replace('StartScreen');
        }}>
        注销
      </Button>
      <Text>Mine/profile</Text>
    </Box>
  );
};

export default ProfileScreen;
