import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RouterWithBottomTab from '~routes/routerWithBottomTab';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RouterWithBottomTab></RouterWithBottomTab>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
