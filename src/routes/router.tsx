import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '~screens/login';
import RegisterScreen from '~screens/register';
import BottomTab from './bottomTab';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  BottomTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Router;
