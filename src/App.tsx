import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {extendTheme, INativebaseConfig, NativeBaseProvider} from 'native-base';
import Router from '~routes/router';
import {observer} from 'mobx-react-lite';
import {getData} from '~utils';
import LaunchScreen from '~screens/launch';

const customTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

const config: INativebaseConfig = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(true);
  useEffect(() => {
    getData('userInfo')
      .then(res => {
        console.log('缓存读取成功');
        if (res) setIsNeedLogin(false);
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setIsLaunched(true), 2000));
  }, []);

  return (
    <NativeBaseProvider theme={customTheme} config={config}>
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
