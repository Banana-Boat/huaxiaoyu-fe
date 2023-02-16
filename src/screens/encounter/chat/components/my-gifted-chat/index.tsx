import {HStack, Icon, Pressable, Toast, useColorMode} from 'native-base';
import {useCallback, useState} from 'react';
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
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Image as ImageCompressor} from 'react-native-compressor';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IMyGiftedChatProps {
  onSendImage: (image: string) => void;
}

const MyGiftedChat: React.FC<GiftedChatProps & IMyGiftedChatProps> = props => {
  const {onSendImage, ...restProps} = props;

  const {colorMode} = useColorMode();

  /* 处理 IOS 输入框安全区域（键盘弹出则不需要底部安全距离）*/
  const {bottom: safePaddingBottom} = useSafeAreaInsets();
  const [isNeedSafePB, setIsNeedSafePB] = useState(1);
  Keyboard.addListener('keyboardWillShow', () => {
    setIsNeedSafePB(0);
    setIsShowOption(false);
  });
  Keyboard.addListener('keyboardWillHide', () => setIsNeedSafePB(1));

  /* 功能按键 */
  const [isShowOption, setIsShowOption] = useState(false);

  /* 图片信息 */
  const imagePickerResHandle = useCallback(
    async (res: ImagePickerResponse, errMsg: string) => {
      try {
        if (res.didCancel) return;

        if (!res.assets || (res.assets && res.assets.length < 1))
          throw new Error();

        const compressedBase64 = await ImageCompressor.compress(
          (res.assets as Asset[])[0].uri as string,
          {
            returnableOutputType: 'base64',
            maxHeight: 256,
            maxWidth: 256,
          },
        );

        if (!compressedBase64) throw new Error();

        // 图片需要添加前缀并需要去掉换行符
        const image = `data:image/jpg;base64,${compressedBase64}`.replace(
          /\n|\r/g,
          '',
        );
        onSendImage(image);
      } catch {
        Toast.show({
          description: errMsg,
          duration: 2000,
        });
      }
    },
    [],
  );

  const photoBtnPressHandle = useCallback(async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
      includeExtra: false,
    });

    imagePickerResHandle(res, '获取图片失败');
  }, []);

  const cameraBtnPressHandle = useCallback(async () => {
    const res = await launchCamera({
      mediaType: 'photo',
      includeExtra: false,
    });

    imagePickerResHandle(res, '拍摄失败');
  }, []);

  return (
    <GiftedChat
      {...restProps}
      minInputToolbarHeight={safePaddingBottom * isNeedSafePB + 44 + 10}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            bottom: 0,
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
        <HStack style={{width: isShowOption ? 195 : 50}} alignItems="center">
          <Actions
            {...props}
            onPressActionButton={() => setIsShowOption(flag => !flag)}
            containerStyle={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              paddingHorizontal: 24,
              height: 40,
              width: 40,
              marginBottom: 0,
              marginLeft: 0,
            }}
            icon={() => (
              <Icon
                as={Ionicon}
                name="ellipsis-horizontal"
                size="lg"
                color={colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400'}
              />
            )}
          />

          {isShowOption && (
            <HStack space={3}>
              <Pressable onPress={photoBtnPressHandle}>
                <Icon
                  as={Ionicon}
                  name="image"
                  size="lg"
                  color={colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400'}
                />
              </Pressable>
              <Pressable onPress={cameraBtnPressHandle}>
                <Icon
                  as={Ionicon}
                  name="camera"
                  size="lg"
                  color={colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400'}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  Toast.show({description: '功能建设中...', duration: 2000})
                }>
                <Icon
                  as={Ionicon}
                  name="mic"
                  size="lg"
                  color={colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400'}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  Toast.show({description: '功能建设中...', duration: 2000})
                }>
                <Icon
                  as={Ionicon}
                  name="videocam"
                  size="lg"
                  color={colorMode === 'dark' ? 'warmGray.500' : 'warmGray.400'}
                />
              </Pressable>
            </HStack>
          )}
        </HStack>
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
      quickReplyStyle={{
        minHeight: 38,
        paddingHorizontal: 8,
        marginVertical: 8,
      }}
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
