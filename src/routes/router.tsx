import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '~screens/encounter/chat';
import EditInfoScreen from '~screens/mine/edit-info';
import FriendScreen from '~screens/mine/friend';
import MessageScreen from '~screens/mine/message';
import RecordScreen from '~screens/mine/record';
import StartScreen from '~screens/start';
import BottomTab from './bottomTab';

interface IProps {
  isNeedLogin: boolean;
}

export type RootStackParamList = {
  StartScreen: undefined;
  Main: undefined;
  EditInfoScreen: undefined;
  FriendScreen: undefined;
  ChatScreen: undefined;
  MessageScreen: undefined;
  RecordScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: React.FC<IProps> = ({isNeedLogin}) => {
  return (
    <Stack.Navigator
      initialRouteName={isNeedLogin ? 'StartScreen' : 'Main'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTab}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
      <Stack.Screen name="FriendScreen" component={FriendScreen} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          gestureEnabled: false,
          fullScreenGestureEnabled: false,
        }}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
    </Stack.Navigator>
  );
};

export default Router;
