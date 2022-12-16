import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from '~screens/start';
import BottomTab from './bottomTab';

export type RootStackParamList = {
  StartScreen: undefined;
  BottomTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Router;
