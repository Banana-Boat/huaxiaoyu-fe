import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Icon, useColorMode} from 'native-base';
import ProfileScreen from '~screens/mine/profile';
import HomeScreen from '~screens/encounter/home';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {colorMode} = useColorMode();

  return (
    <Tab.Navigator
      initialRouteName="EncounterStack"
      screenOptions={{
        tabBarActiveTintColor: '#db2777', // pink.600
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? '#27272a' : '#f9fafb', // dark.100 / coolGrey.50
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="EncounterStack"
        component={HomeScreen}
        options={{
          tabBarLabel: '遇见',
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Icon as={Ionicon} name="planet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MineStack"
        component={ProfileScreen}
        options={{
          tabBarLabel: '我的',
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Icon as={Ionicon} name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
