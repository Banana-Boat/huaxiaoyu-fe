import {Button, Divider, Flex} from 'native-base';
import {ColorSchemeType} from 'native-base/lib/typescript/components/types';
import {DictType} from '~utils/types';

interface IProps {
  interestDicts: {
    sport: DictType;
    study: DictType;
    entertainment: DictType;
  };
  selectedCodeList: string[];
  interestBtnPressHandle: (code: string) => void;
}

interface ISelectorProps {
  dict: DictType;
  colorScheme: ColorSchemeType;
  selectedCodeList: string[];
  interestBtnPressHandle: (code: string) => void;
}

const Selector: React.FC<ISelectorProps> = ({
  dict,
  colorScheme,
  selectedCodeList,
  interestBtnPressHandle,
}) => {
  return (
    <Flex direction="row" mt={1} wrap="wrap">
      {dict.map(item => (
        <Button
          onPress={() => interestBtnPressHandle(item.code)}
          isPressed={selectedCodeList.indexOf(item.code) !== -1}
          key={item.code}
          variant="outline"
          colorScheme={colorScheme}
          rounded={20}
          m={1}
          size="xs"
          w="auto">
          {item.name}
        </Button>
      ))}
    </Flex>
  );
};

const InterestSelect: React.FC<IProps> = ({
  interestDicts,
  selectedCodeList,
  interestBtnPressHandle,
}) => {
  return (
    <>
      <Selector
        dict={interestDicts.sport}
        colorScheme="lightBlue"
        selectedCodeList={selectedCodeList}
        interestBtnPressHandle={interestBtnPressHandle}
      />
      {/* <Divider my={2} /> */}
      <Selector
        dict={interestDicts.entertainment}
        colorScheme="rose"
        selectedCodeList={selectedCodeList}
        interestBtnPressHandle={interestBtnPressHandle}
      />
      {/* <Divider my={2} /> */}
      <Selector
        dict={interestDicts.study}
        colorScheme="lime"
        selectedCodeList={selectedCodeList}
        interestBtnPressHandle={interestBtnPressHandle}
      />
    </>
  );
};

export default InterestSelect;
