import {Box, Image, Text, useColorMode} from 'native-base';

const Empty = () => {
  const {colorMode} = useColorMode();

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Image
        style={{
          opacity: colorMode === 'dark' ? 0.3 : 0.1,
          aspectRatio: 1,
          width: '25%',
          height: '25%',
        }}
        source={require('~assets/images/logo-line.png')}
        alt="空列表"
      />
      <Text
        fontSize="md"
        bold
        color="black"
        opacity={colorMode === 'dark' ? 0.4 : 0.15}>
        空空如也
      </Text>
    </Box>
  );
};

export default Empty;
