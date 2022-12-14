import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EncounterStack from './encounterStack';
import MineStack from './mineStack';
import Icon from 'react-native-vector-icons/Foundation';
Icon.loadFont();

const Tab = createBottomTabNavigator();

const RouterWithBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Encounter"
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#FF8200'}}>
      <Tab.Screen
        name="Encounter"
        component={EncounterStack}
        options={{
          tabBarLabel: '遇见',
          tabBarIcon: ({size, color}) => (
            <Icon name="mountains" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mine"
        component={MineStack}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({size, color}) => (
            <Icon name="torso" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RouterWithBottomTab;
