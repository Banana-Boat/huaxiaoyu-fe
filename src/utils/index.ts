import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'native-base';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

/* 音频相关 */
export const loadAudioInBundle = (audioFile: any) =>
  new Promise<Sound>((resolve, reject) => {
    const audio = new Sound(audioFile, err => {
      if (err) reject();
      resolve(audio);
    });
  });

export const loadAudioInDocument = (audioFileName: string) =>
  new Promise<Sound>((resolve, reject) => {
    const audio = new Sound(audioFileName, RNFS.DocumentDirectoryPath, err => {
      if (err) reject();
      resolve(audio);
    });
  });

// 去除无效字段
export const formatParams = (obj: {[x: string]: any}) => {
  const _obj = JSON.parse(JSON.stringify(obj));
  for (let key in _obj) {
    if (_obj[key] === '' || _obj[key] === undefined || _obj[key] === null)
      delete _obj[key];
    if (typeof _obj[key] === 'object' && Object.keys(_obj[key]).length === 0)
      delete _obj[key];
  }
  return _obj;
};

/** 本地存储相关 */
export const setData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Toast.show({description: '本地存储出错', duration: 2000});
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Toast.show({description: '本地存储出错', duration: 2000});
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    Toast.show({description: '本地存储出错', duration: 2000});
  }
};
