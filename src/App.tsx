import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import Router from '~routes/router';
import {observer} from 'mobx-react-lite';

const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Router></Router>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default observer(App);
