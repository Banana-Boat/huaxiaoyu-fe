import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, Button, Text} from 'native-base';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';
import {removeData} from '~utils';

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <PageContainer>
      <Button
        onPress={async () => {
          await removeData('userInfo');
          navigation.replace('StartScreen');
        }}>
        注销
      </Button>
      <Text>Mine/profile</Text>
    </PageContainer>
  );
};

export default ProfileScreen;
