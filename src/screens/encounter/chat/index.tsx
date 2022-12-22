import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AlertDialog, Button, Text} from 'native-base';
import {useCallback, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import PageContainer from '~components/page-container';
import {RootStackParamList} from '~routes/router';

const ChatScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /** 退出页面提醒 */
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  // 处理android端系统级返回按键
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setIsAlertOpen(true);
          return true;
        },
      );
      return () => subscription.remove();
    }, []),
  );

  const quit = useCallback(() => {
    // 退出处理逻辑...

    setIsAlertOpen(false);
    navigation.goBack();
  }, [navigation]);

  return (
    <PageContainer
      hasHeader
      title="猪皮香蕉船"
      leftAction={() => setIsAlertOpen(true)}>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isAlertOpen}>
        <AlertDialog.Content>
          <AlertDialog.Header>退出提醒</AlertDialog.Header>
          <AlertDialog.Body>
            退出聊天后将不能再次向 她/他 发起聊天，你确定要退出吗？
          </AlertDialog.Body>
          <AlertDialog.Footer py={2}>
            <Button.Group>
              <Button
                onPress={() => setIsAlertOpen(false)}
                variant="ghost"
                colorScheme="primary">
                取消
              </Button>
              <Button onPress={quit} variant="ghost" colorScheme="danger">
                确定
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </PageContainer>
  );
};

export default ChatScreen;
