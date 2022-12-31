import {
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
  ScrollView,
  VStack,
  Radio,
  HStack,
  Icon,
  Select,
  Toast,
  Box,
  Modal,
  Text,
  Pressable,
} from 'native-base';
import {memo, useCallback, useState} from 'react';
import InterestSelect from '~components/interest-select';
import {SexType} from '~stores/user/types';
import userStore from '~stores/user/userStore';
import PageContainer from '~components/page-container';
import {updateUserInfo} from './api';
import {yearOptionList} from './constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {Image as ImageCompressor} from 'react-native-compressor';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '~routes/router';

interface IFormData {
  password?: string;
  sex: SexType;
  departmentCode?: string;
  age?: number;
  nickname?: string;
  phoneNum?: string;
  headPhoto?: string;
}

const EditInfoScreen = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /** 头像相关 */
  const [isShowAvatarModal, setIsShowAvatarModal] = useState(false);

  const imagePickerResHandle = useCallback(
    async (res: ImagePickerResponse, errMsg: string) => {
      try {
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

        if (!compressedBase64) throw new Error('sss');

        // 显示选中的图片需要前缀，提交表单时再删去，需要去掉换行符
        const headPhoto = `data:image/jpg;base64,${compressedBase64}`.replace(
          /\n|\r/g,
          '',
        );
        setFormData(data => ({
          ...data,
          headPhoto,
        }));
        setIsShowAvatarModal(false);
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

  /** 表单 */
  const [formData, setFormData] = useState<IFormData>({
    sex: userStore.user.sex,
    departmentCode: userStore.user.departmentCode,
    age: userStore.user.age,
    nickname: userStore.user.nickname,
    phoneNum: userStore.user.phoneNum,
    password: '',
    headPhoto: userStore.user.headPhoto,
  });
  const [rePassword, setRePassword] = useState('');
  const [interestCodeList, setInterestCodeList] = useState<string[]>([
    ...userStore.user.interestCodeList,
  ]);

  const interestBtnPressHandle = useCallback((code: string) => {
    setInterestCodeList(codeList => {
      if (codeList.indexOf(code) === -1) return [...codeList, code];
      else return codeList.filter(item => item !== code);
    });
  }, []);

  const editBtnPressHandle = useCallback(async () => {
    if (!validate()) return;

    // 提交表单时去除base64的前缀 data:image/jpg;base64,
    const headPhoto = formData.headPhoto
      ? formData.headPhoto?.split(',')[1]
      : '';

    const data = {
      ...formData,
      headPhoto,
      username: userStore.user.username,
      interestCodeList: interestCodeList.join(','),
    };

    // 若password字段为空，则删去该字段
    if (!data.password) delete data.password;

    try {
      if (await updateUserInfo(data)) {
        Toast.show({description: '修改成功', duration: 2000});
        navigation.goBack();
      }
    } catch (err) {
      Toast.show({description: '修改失败', duration: 2000});
    }
  }, [formData, interestCodeList]);

  const [errors, setErrors] = useState({
    password: '',
    phoneNum: '',
  });

  const validate = useCallback(() => {
    let res = true;

    if (formData.password !== rePassword) {
      setErrors(errors => ({...errors, password: '两次密码输入不相同'}));
      res = false;
    } else setErrors(errors => ({...errors, password: ''}));

    if (formData.phoneNum && !/^1\d{10}$/.test(formData.phoneNum)) {
      setErrors(errors => ({...errors, phoneNum: '电话号码格式有误'}));
      res = false;
    } else setErrors(errors => ({...errors, phoneNum: ''}));

    return res;
  }, [formData, errors, rePassword]);

  return (
    <PageContainer hasHeader title="个人信息修改">
      <Modal
        isOpen={isShowAvatarModal}
        onClose={() => setIsShowAvatarModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>请选择获取方式</Modal.Header>
          <Modal.Body p={6}>
            <HStack space={12} justifyContent="center">
              <Pressable alignItems="center" onPress={cameraBtnPressHandle}>
                <Icon as={Ionicon} name="camera" size="2xl" />
                <Text>相机</Text>
              </Pressable>
              <Pressable alignItems="center" onPress={photoBtnPressHandle}>
                <Icon as={Ionicon} name="image" size="2xl" />
                <Text>相册</Text>
              </Pressable>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <ScrollView px={6} h="80%" mt={4}>
        <VStack alignItems="center" space={4}>
          <FormControl>
            <FormControl.Label>头像</FormControl.Label>
            <Pressable
              onPress={() => setIsShowAvatarModal(true)}
              position="relative"
              alignSelf="center">
              <Image
                source={
                  formData.headPhoto
                    ? {uri: formData.headPhoto}
                    : require('~assets/images/avatar.png')
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
              <Box
                position="absolute"
                right={0}
                bottom={0}
                rounded={30}
                bg="lime.600">
                <Icon as={Ionicon} name="attach" size="xl" color="white" />
              </Box>
            </Pressable>
          </FormControl>

          <FormControl>
            <FormControl.Label>昵称</FormControl.Label>
            <Input
              value={formData.nickname ?? ''}
              onChangeText={nickname =>
                setFormData(data => ({...data, nickname}))
              }
              size="md"
              variant="underlined"
              placeholder="请输入昵称"
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>出生年份</FormControl.Label>
            <Select
              selectedValue={formData.age?.toString() ?? ''}
              placeholder="请选择你的出生年份"
              onValueChange={age =>
                setFormData(data => ({...data, age: Number.parseInt(age)}))
              }
              rounded={16}
              size="md"
              mt={2}>
              {yearOptionList.map(item => (
                <Select.Item
                  label={item.toString() + '年'}
                  value={(new Date().getFullYear() - item).toString()}
                  key={item}
                  style={{
                    alignItems: 'center',
                  }}
                />
              ))}
            </Select>
          </FormControl>

          <FormControl isInvalid={errors.phoneNum !== ''}>
            <FormControl.Label>手机号码</FormControl.Label>
            <Input
              value={formData.phoneNum ?? ''}
              onChangeText={phoneNum =>
                setFormData(data => ({...data, phoneNum}))
              }
              size="md"
              variant="underlined"
              placeholder="请填写手机号码"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.phoneNum}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>兴趣爱好</FormControl.Label>
            <InterestSelect
              interestDicts={userStore.interestDicts}
              selectedCodeList={interestCodeList}
              interestBtnPressHandle={interestBtnPressHandle}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>新密码</FormControl.Label>
            <Input
              onChangeText={password =>
                setFormData(data => ({...data, password}))
              }
              type="password"
              size="md"
              variant="underlined"
              placeholder="不少于6个字符且包含大小写"
            />
          </FormControl>

          <FormControl isInvalid={errors.password !== ''}>
            <FormControl.Label>重复新密码</FormControl.Label>
            <Input
              onChangeText={rePassword => setRePassword(rePassword)}
              type="password"
              size="md"
              variant="underlined"
              placeholder="请重复输入新密码"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>性别</FormControl.Label>
            <Radio.Group
              value={formData.sex}
              name="sex"
              onChange={sex =>
                setFormData(data => ({...data, sex: sex as SexType}))
              }>
              <HStack mt={1}>
                <Radio
                  value={SexType.FEMALE}
                  colorScheme="pink"
                  icon={<Icon as={Ionicon} name="female-outline" size="lg" />}>
                  女
                </Radio>
                <Radio
                  value={SexType.MALE}
                  colorScheme="lightBlue"
                  ml={8}
                  icon={<Icon as={Ionicon} name="male-outline" size="lg" />}>
                  男
                </Radio>
              </HStack>
            </Radio.Group>
          </FormControl>

          <FormControl>
            <FormControl.Label>院系</FormControl.Label>
            <Select
              selectedValue={formData.departmentCode}
              placeholder="请选择你的院系"
              onValueChange={departmentCode =>
                setFormData(data => ({...data, departmentCode}))
              }
              rounded={16}
              size="md"
              mt={2}>
              {userStore.departmentDict.map(item => (
                <Select.Item
                  label={item.name}
                  value={item.code}
                  key={item.code}
                />
              ))}
            </Select>
          </FormControl>
        </VStack>
      </ScrollView>

      <Button
        onPress={editBtnPressHandle}
        size="sm"
        my={4}
        alignSelf="center"
        borderRadius="3xl"
        w="60%"
        colorScheme="pink"
        shadow={1}>
        修 改
      </Button>
    </PageContainer>
  );
});

export default EditInfoScreen;
