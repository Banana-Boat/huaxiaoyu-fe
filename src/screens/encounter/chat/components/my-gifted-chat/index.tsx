import {Icon, Toast, useColorMode} from 'native-base';
import {useState} from 'react';
import {Keyboard} from 'react-native';
import {
  Actions,
  Avatar,
  Bubble,
  Composer,
  GiftedChat,
  GiftedChatProps,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';

const MyGiftedChat: React.FC<GiftedChatProps> = props => {
  const {colorMode} = useColorMode();

  // 处理 IOS 输入框安全区域
  const {bottom: safePaddingBottom} = useSafeAreaInsets();
  const [isNeedSafePB, setIsNeedSafePB] = useState(1);
  Keyboard.addListener('keyboardWillShow', () => setIsNeedSafePB(0));
  Keyboard.addListener('keyboardWillHide', () => setIsNeedSafePB(1));

  return (
    <GiftedChat
      {...props}
      minInputToolbarHeight={safePaddingBottom * isNeedSafePB + 44 + 10}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: safePaddingBottom * isNeedSafePB + 5,
            backgroundColor: colorMode === 'dark' ? '#27272a' : '#fff',
            borderTopWidth: 0,
          }}
        />
      )}
      renderActions={props => (
        <Actions
          {...props}
          onPressActionButton={() =>
            Toast.show({description: '功能建设中...', duration: 2000})
          }
          containerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
            marginBottom: 0,
            marginLeft: 0,
          }}
          icon={() => (
            <Icon
              as={Ionicon}
              name="add-circle"
              size="lg"
              color={colorMode === 'dark' ? 'warmGray.600' : 'warmGray.300'}
            />
          )}
        />
      )}
      renderComposer={props => (
        <Composer
          {...props}
          textInputStyle={{
            lineHeight: 20,
            color: colorMode === 'dark' ? '#fafaf9' : '#3f3f46',
            marginLeft: 0,
            paddingHorizontal: 15,
            borderRadius: 20,
            backgroundColor: colorMode === 'dark' ? '#18181b' : '#f3f4f6', // dark.50 - coolGray.100
          }}
        />
      )}
      renderSend={props => {
        return (
          <Send
            {...props}
            containerStyle={{
              justifyContent: 'center',
              marginHorizontal: 16,
            }}>
            <Icon as={Ionicon} name="send" size="md" color="pink.600" />
          </Send>
        );
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          // dark: bg-dark.100 text-warmGray.50 / light: bg-#fff text-dark.200
          textStyle={{
            left: {color: colorMode === 'dark' ? '#fafaf9' : '#3f3f46'},
            right: {color: '#fafaf9'},
          }}
          wrapperStyle={{
            left: {
              left: 0,
              backgroundColor: colorMode === 'dark' ? '#27272a' : '#fff',
            },
            right: {
              backgroundColor: '#db2777', // pink.600
            },
          }}
        />
      )}
      renderAvatar={props => (
        <Avatar
          {...props}
          containerStyle={{
            left: {
              backgroundColor: colorMode === 'dark' ? '#27272a' : '#fff',
              borderRadius: 20,
              marginRight: 0,
            },
            right: {
              backgroundColor: colorMode === 'dark' ? '#27272a' : '#fff',
              borderRadius: 20,
              marginLeft: 0,
            },
          }}
        />
      )}
      onLongPress={undefined}
      showUserAvatar
      timeFormat="h:mm A"
      dateFormat="YYYY年 M月 D日"
      placeholder=""
      alwaysShowSend
      wrapInSafeArea={false}
    />
  );
};

export default MyGiftedChat;
