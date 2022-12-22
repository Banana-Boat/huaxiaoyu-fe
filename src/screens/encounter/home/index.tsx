import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from 'native-base';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <PageContainer safeAreaBottom={0}>
      <Button
        onPress={() => navigation.navigate('ChatScreen')}
        alignSelf="center"
        colorScheme="teal"
        w="60%"
        rounded={20}>
        遇 见
      </Button>
    </PageContainer>
  );
};

export default HomeScreen;
