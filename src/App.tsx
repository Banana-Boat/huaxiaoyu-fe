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
import {observer} from 'mobx-react-lite';
import {getData} from '~utils';
import LaunchScreen from '~screens/launch';
import userStore from '~stores/user/userStore';
import {getInterestDicts, getDepartmentDict} from '~utils/api';
import {DictType} from '~utils/types';

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
    getData('userInfo')
      .then(res => {
        if (res) {
          console.log(res);
          setIsNeedLogin(false);

          userStore.updateUserInfo(res);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => setIsLaunched(true), 2000));
  }, []);

  /** 获取院系、兴趣字典表 */
  useEffect(() => {
    try {
      getInterestDicts().then(dicts => userStore.updateInterestDicts(dicts));
      getDepartmentDict().then(dict => userStore.updateDepartmentDict(dict));
    } catch {
      Toast.show({description: '字典表请求失败', duration: 2000});
    }
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
