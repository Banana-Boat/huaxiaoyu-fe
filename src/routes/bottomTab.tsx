import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {Icon, useColorMode} from 'native-base';
import ProfileScreen from '~screens/mine/profile';
import HomeScreen from '~screens/encounter/home';
IoniconsIcon.loadFont();

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {colorMode} = useColorMode();

  return (
    <Tab.Navigator
      initialRouteName="EncounterStack"
      screenOptions={{
        tabBarActiveTintColor: '#ec4899', // pink.500
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
            <IoniconsIcon name="planet" size={size} color={color} />
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
            <Icon as={IoniconsIcon} name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
