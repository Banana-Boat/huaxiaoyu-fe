import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorMode} from 'native-base';
import EditInfoScreen from '~screens/mine/edit-info';
import StartScreen from '~screens/start';
import BottomTab from './bottomTab';

interface IProps {
  isNeedLogin: boolean;
}

export type RootStackParamList = {
  StartScreen: undefined;
  Main: undefined;
  EditInfoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC<IProps> = ({isNeedLogin}) => {
  const {colorMode} = useColorMode();

  return (
    <Stack.Navigator
      initialRouteName={isNeedLogin ? 'StartScreen' : 'Main'}
      screenOptions={{
        headerTitleStyle: {
          color: colorMode === 'dark' ? '#f9fafb' : '#27272a', // coolGrey.50 / dark.100
        },
        headerStyle: {
          backgroundColor: colorMode === 'dark' ? '#27272a' : '#f9fafb', // dark.100 / coolGrey.50
        },
      }}>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTab}
        options={{headerShown: false, animation: 'fade'}}
      />
      <Stack.Screen
        name="EditInfoScreen"
        component={EditInfoScreen}
        options={{title: '个人信息修改'}}
      />
    </Stack.Navigator>
  );
};

export default Router;
