import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from '~screens/start';
import BottomTab from './bottomTab';

interface IProps {
  isNeedLogin: boolean;
}

export type RootStackParamList = {
  StartScreen: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC<IProps> = ({isNeedLogin}) => {
  return (
    <Stack.Navigator
      initialRouteName={isNeedLogin ? 'StartScreen' : 'Main'}
      screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Main" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Router;
