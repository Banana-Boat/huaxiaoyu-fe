import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '~screens/mine/profile';

const Stack = createNativeStackNavigator();

const MineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MineStack;
