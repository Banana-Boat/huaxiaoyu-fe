import {PropsWithChildren} from 'react';
import {View} from 'react-native';
// 使用SafeAreaView上下会出现额外的padding，为查明原因
// import {SafeAreaView} from 'react-native-safe-area-context';

const PageContainer: React.FC<PropsWithChildren> = props => {
  const {children} = props;
  return (
    <View style={{paddingHorizontal: 5, paddingVertical: 10}}>{children}</View>
  );
};

export default PageContainer;
