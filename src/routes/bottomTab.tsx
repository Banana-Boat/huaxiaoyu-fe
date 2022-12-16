import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EncounterStack from './encounterStack';
import MineStack from './mineStack';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="EncounterStack"
      screenOptions={{tabBarActiveTintColor: '#ec4899'}}>
      <Tab.Screen
        name="EncounterStack"
        component={EncounterStack}
        options={{
          tabBarLabel: '遇见',
          headerTitle: '首页',
          tabBarIcon: ({size, color}) => (
            <Icon name="planet" size={size} color={color} />
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
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
