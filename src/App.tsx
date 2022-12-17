import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {extendTheme, NativeBaseProvider} from 'native-base';
import Router from '~routes/router';
import {observer} from 'mobx-react-lite';
import {getData} from '~utils';
import LaunchScreen from '~screens/launch';

const customTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

const App = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(true);
  useEffect(() => {
    getData('userInfo')
      .then(res => {
        console.log(res);
        if (res) setIsNeedLogin(false);
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setIsLaunched(true), 2000));
  }, []);

  return (
    <NativeBaseProvider theme={customTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isLaunched ? (
            <Router isNeedLogin={isNeedLogin}></Router>
          ) : (
            <LaunchScreen />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default observer(App);
