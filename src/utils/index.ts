import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'native-base';

export const setData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Toast.show({description: '本地存储出错'});
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Toast.show({description: '本地存储出错'});
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    Toast.show({description: '本地存储出错'});
  }
};
