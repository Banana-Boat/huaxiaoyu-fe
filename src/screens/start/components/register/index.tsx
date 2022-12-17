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
} from 'native-base';
import {memo, useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '~routes/router';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {DictType} from '~utils/types';
import InterestSelect from '~components/interest-select';
IoniconsIcon.loadFont();

const Register = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedInterestCodeList, setSelectedInterestCodeList] = useState<
    string[]
  >([]);

  const interestBtnPressHandle = useCallback((code: string) => {
    setSelectedInterestCodeList(codeList => {
      if (codeList.indexOf(code) === -1) return [...codeList, code];
      else return codeList.filter(item => item !== code);
    });
  }, []);

  const [departmentDict, setDepartmentDict] = useState<DictType>([]);
  const [interestDicts, setInterestDicts] = useState<{
    sport: DictType;
    study: DictType;
    entertainment: DictType;
  }>({
    sport: [
      {name: '篮球', code: '0001'},
      {name: '篮球', code: '0002'},
      {name: '篮球', code: '0003'},
      {name: '篮球', code: '0004'},
      {name: '篮球', code: '0005'},
      {name: '篮球', code: '0006'},
    ],
    study: [
      {name: '篮球', code: '0101'},
      {name: '篮球', code: '0102'},
      {name: '篮球', code: '0103'},
    ],
    entertainment: [
      {name: '篮球', code: '0201'},
      {name: '篮球', code: '0202'},
      {name: '篮球', code: '0203'},
    ],
  });

  useEffect(() => {
    // 获取院系、兴趣字典表
  }, []);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [sexErrorMsg, setSexErrorMsg] = useState('');
  const [departmentCodeErrorMsg, setDepartmentCodeErrorMsg] = useState('');

  return (
    <Flex flex={1}>
      <ScrollView px={6} h="80%" mt={4}>
        <VStack alignItems="center" space={4}>
          <FormControl isInvalid={usernameErrorMsg !== ''}>
            <FormControl.Label>用户名</FormControl.Label>
            <Input variant="underlined" size="md" placeholder="不少于6个字符" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {usernameErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={passwordErrorMsg !== ''}>
            <FormControl.Label>密码</FormControl.Label>
            <Input
              type="password"
              size="md"
              variant="underlined"
              placeholder="不少于6个字符且包含大小写"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {passwordErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={sexErrorMsg !== ''}>
            <FormControl.Label>性别</FormControl.Label>
            <Radio.Group name="sexRadio">
              <HStack>
                <Radio
                  value="female"
                  colorScheme="pink"
                  icon={
                    <Icon
                      as={IoniconsIcon}
                      name="female-outline"
                      size="lg"
                      color="#fff"
                    />
                  }>
                  女
                </Radio>
                <Radio
                  value="male"
                  ml={16}
                  colorScheme="lightBlue"
                  icon={
                    <Icon as={IoniconsIcon} name="male-outline" size="lg" />
                  }>
                  男
                </Radio>
              </HStack>
            </Radio.Group>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {sexErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={departmentCodeErrorMsg !== ''}>
            <FormControl.Label>院系</FormControl.Label>
            <Select placeholder="请选择你的院系">
              {departmentDict.map(item => (
                <Select.Item label={item.name} value={item.code} />
              ))}
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {departmentCodeErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>兴趣爱好</FormControl.Label>
            <InterestSelect
              interestDicts={interestDicts}
              selectedCodeList={selectedInterestCodeList}
              interestBtnPressHandle={interestBtnPressHandle}
            />
          </FormControl>
        </VStack>
      </ScrollView>

      <Button
        onPress={() => navigation.replace('Main')}
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
