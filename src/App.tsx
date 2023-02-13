import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  extendTheme,
  INativebaseConfig,
  NativeBaseProvider,
  Toast,
} from 'native-base';
import Router from '~routes/router';
import {getData} from '~utils';
import LaunchScreen from '~screens/launch';
import userStore from '~stores/user/userStore';
import {getInterestDicts, getDepartmentDict, getUserInfo} from '~utils/api';

/** Native Base配置 */
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
  const [isLaunched, setIsLaunched] = useState(false); // 启动页是否启动完毕

  /** 读取本地登录状态信息 */
  const [isNeedLogin, setIsNeedLogin] = useState(true); // 是否需要登录
  useEffect(() => {
    getData('jwt')
      .then(async jwt => {
        if (jwt) {
          // 先将jwt注入header通过获取用户信息的API判断是否过期
          userStore.updateJwt(jwt);
          try {
            if (await getUserInfo()) setIsNeedLogin(false);
          } catch {
            userStore.updateJwt('');
          }
        }
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setIsLaunched(true), 2000));
  }, []);

  /** 提前获取院系、兴趣字典表 */
  useEffect(() => {
    getInterestDicts()
      .then(dicts => userStore.updateInterestDicts(dicts))
      .catch(() => Toast.show({description: '字典表请求失败', duration: 2000}));
    getDepartmentDict()
      .then(dict => userStore.updateDepartmentDict(dict))
      .catch(() => Toast.show({description: '字典表请求失败', duration: 2000}));
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

export default App;
