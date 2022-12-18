import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EncounterStack from './encounterStack';
import MineStack from './mineStack';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {Icon, useColorMode} from 'native-base';
IoniconsIcon.loadFont();

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {colorMode} = useColorMode();

  return (
    <Tab.Navigator
      initialRouteName="EncounterStack"
      screenOptions={{
        tabBarActiveTintColor: '#ec4899',
        tabBarStyle: {
          backgroundColor: colorMode === 'dark' ? '#27272a' : '#fff',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="EncounterStack"
        component={EncounterStack}
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
        component={MineStack}
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
