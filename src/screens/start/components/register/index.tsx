import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
  Flex,
  Toast,
} from 'native-base';
import {memo, useCallback, useState} from 'react';
import {RootStackParamList} from '~routes/router';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import InterestSelect from '~components/interest-select';
import {register} from './api';
import {SexType} from '~stores/user/types';
import {formatParams} from '~utils';
import userStore from '~stores/user/userStore';

interface IFormData {
  username: string;
  password: string;
  sex: SexType;
  departmentCode: string;
}

const Register = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /** 表单 */
  const [formData, setFormData] = useState<IFormData>({
    username: '',
    password: '',
    sex: SexType.NONE,
    departmentCode: '0',
  });
  const [interestCodeList, setInterestCodeList] = useState<string[]>([]);

  const interestBtnPressHandle = useCallback((code: string) => {
    setInterestCodeList(codeList => {
      if (codeList.indexOf(code) === -1) return [...codeList, code];
      else return codeList.filter(item => item !== code);
    });
  }, []);

  const registerBtnPressHandle = useCallback(async () => {
    if (!validate()) return;

    const data = formatParams({
      ...formData,
      interestCodeList: interestCodeList.join(','),
    });

    try {
      if (await register(data)) {
        Toast.show({description: '注册成功', duration: 2000});
        navigation.replace('Main');
      }
    } catch {
      Toast.show({description: '注册失败', duration: 2000});
    }
  }, [formData, interestCodeList]);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    sex: '',
    departmentCode: '',
  });

  const validate = useCallback(() => {
    let res = true;

    if (formData.username === '') {
      setErrors(errors => ({...errors, username: '用户名不可为空'}));
      res = false;
    } else setErrors(errors => ({...errors, username: ''}));

    if (formData.password === '') {
      setErrors(errors => ({...errors, password: '密码不可为空'}));
      res = false;
    } else setErrors(errors => ({...errors, password: ''}));

    if (formData.sex === SexType.NONE) {
      setErrors(errors => ({...errors, sex: '性别为必填项'}));
      res = false;
    } else setErrors(errors => ({...errors, sex: ''}));

    if (formData.departmentCode === '') {
      setErrors(errors => ({...errors, departmentCode: '院系为必填项'}));
      res = false;
    } else setErrors(errors => ({...errors, departmentCode: ''}));

    return res;
  }, [formData, errors]);

  return (
    <Flex flex={1}>
      <ScrollView px={6} h="80%" mt={4}>
        <VStack alignItems="center" space={4}>
          <FormControl isInvalid={errors.username !== ''}>
            <FormControl.Label>用户名</FormControl.Label>
            <Input
              onChangeText={username =>
                setFormData(data => ({...data, username}))
              }
              variant="underlined"
              size="md"
              placeholder="不少于6个字符"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.username}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password !== ''}>
            <FormControl.Label>密码</FormControl.Label>
            <Input
              onChangeText={password =>
                setFormData(data => ({...data, password}))
              }
              type="password"
              size="md"
              variant="underlined"
              placeholder="不少于6个字符且包含大小写"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.sex !== ''}>
            <FormControl.Label>性别</FormControl.Label>
            <Radio.Group
              name="sex"
              onChange={sex =>
                setFormData(data => ({...data, sex: sex as SexType}))
              }>
              <HStack mt={1}>
                <Radio
                  value={SexType.FEMALE}
                  colorScheme="pink"
                  icon={
                    <Icon as={IoniconsIcon} name="female-outline" size="lg" />
                  }>
                  女
                </Radio>
                <Radio
                  value={SexType.MALE}
                  colorScheme="lightBlue"
                  ml={8}
                  icon={
                    <Icon as={IoniconsIcon} name="male-outline" size="lg" />
                  }>
                  男
                </Radio>
              </HStack>
            </Radio.Group>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.sex}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.departmentCode !== ''}>
            <FormControl.Label>院系</FormControl.Label>
            <Select
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
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.departmentCode}
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
        </VStack>
      </ScrollView>

      <Button
        onPress={registerBtnPressHandle}
        size="sm"
        my={4}
        alignSelf="center"
        borderRadius="3xl"
        w="60%"
        colorScheme="pink"
        shadow={1}>
        注 册
      </Button>
    </Flex>
  );
});

export default Register;
