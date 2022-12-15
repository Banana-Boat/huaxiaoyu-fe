import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '~screens/encounter/home';

const Stack = createNativeStackNavigator();

const EncounterStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: '首页'}}
      />
    </Stack.Navigator>
  );
};

export default EncounterStack;
