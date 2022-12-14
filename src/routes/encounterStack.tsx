import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '~screens/encounter/home';

const Stack = createNativeStackNavigator();

const EncounterStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{title: '首页'}} />
    </Stack.Navigator>
  );
};

export default EncounterStack;
