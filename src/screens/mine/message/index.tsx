import {observer} from 'mobx-react-lite';
import {Box, Icon, Input} from 'native-base';
import {useEffect, useState} from 'react';
import PageContainer from '~components/page-container';
import {IMessageOfMsg} from '~stores/message/types';
import SwipeList from './components/swipe-list';
import Tab from './components/tab';
import {TabType} from './types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import messageStore from '~stores/message/messageStore';

const MessageScreen = () => {
  const [curTab, setCurTab] = useState(TabType.RECEIVE);
  const [sendMessageList, setSendMessageList] = useState<IMessageOfMsg[]>([]);
  const [receiveMessageList, setReceiveMessageList] = useState<IMessageOfMsg[]>(
    [],
  );

  useEffect(() => {
    setSendMessageList(messageStore.sendMsgList);
    setReceiveMessageList(messageStore.receiveMsgList);
  }, [messageStore.sendMsgList, messageStore.receiveMsgList]);

  return (
    <PageContainer hasHeader title="消息中心">
      <Tab curTab={curTab} toggleTab={tab => setCurTab(tab)} />
      <Input
        onChangeText={(text: string) => {
          if (curTab === TabType.SEND)
            setSendMessageList(() =>
              messageStore.sendMsgList.filter(item =>
                item.opponent.nickname.toLocaleLowerCase().includes(text),
              ),
            );
          if (curTab === TabType.RECEIVE)
            setReceiveMessageList(() =>
              messageStore.receiveMsgList.filter(item =>
                item.opponent.nickname.toLocaleLowerCase().includes(text),
              ),
            );
        }}
        placeholder="搜索"
        variant="filled"
        bg="dark.900"
        _dark={{bg: 'dark.100'}}
        rounded={20}
        mx={2}
        my={2}
        px={2}
        InputLeftElement={
          <Icon ml={3} color="gray.400" as={Ionicon} name="search" />
        }
      />
      <Box flex={1} mt={1}>
        <Box display={curTab === TabType.RECEIVE ? 'flex' : 'none'}>
          <SwipeList isReceive={true} messageList={receiveMessageList} />
        </Box>
        <Box display={curTab === TabType.SEND ? 'flex' : 'none'}>
          <SwipeList isReceive={false} messageList={sendMessageList} />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default observer(MessageScreen);
