import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '~screens/mine/home';

const Stack = createNativeStackNavigator();

const MineStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{title: '我的'}} />
    </Stack.Navigator>
  );
};

export default MineStack;
