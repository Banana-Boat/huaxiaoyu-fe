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
} from 'native-base';
import {memo, useCallback, useState} from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import InterestSelect from '~components/interest-select';
import {SexType} from '~stores/user/types';
import {formatParams} from '~utils';
import userStore from '~stores/user/userStore';
import PageContainer from '~components/page-container';
import {updateUserInfo} from './api';

// 14岁-40岁
let cur = 0;
const yearOptionList = Array(26)
  .fill(0)
  .map(() => new Date().getFullYear() - 15 - cur++);

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
  /** 表单 */
  const [formData, setFormData] = useState<IFormData>({
    sex: userStore.user.sex,
    departmentCode: userStore.user.departmentCode,
    age: userStore.user.age,
    nickname: userStore.user.nickname,
    phoneNum: userStore.user.phoneNum,
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

    const data = formatParams({
      username: userStore.user.username,
      ...formData,
      interestCodeList: interestCodeList.join(','),
    });

    try {
      if (await updateUserInfo(data)) {
        Toast.show({description: '修改成功', duration: 2000});
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
  }, [formData, errors]);

  return (
    <PageContainer safeAreaTop={0}>
      <ScrollView px={6} h="80%" mt={4}>
        <VStack alignItems="center" space={4}>
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
