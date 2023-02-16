import {Box} from 'native-base';
import {useState} from 'react';
import PageContainer from '~components/page-container';
import messageStore from '~stores/message/messageStore';
import SwipeList from './components/swipe-list';
import Tab from './components/tab';
import {TabType} from './types';

const MessageScreen = () => {
  const [curTab, setCurTab] = useState(TabType.RECEIVE);
  return (
    <PageContainer hasHeader title="消息中心">
      <Tab curTab={curTab} toggleTab={tab => setCurTab(tab)} />
      <Box flex={1} mt={1}>
        {curTab === TabType.RECEIVE ? (
          <SwipeList sendMsgList={messageStore.sendMsgList} />
        ) : (
          <SwipeList receiveMsgList={messageStore.receiveMsgList} />
        )}
      </Box>
    </PageContainer>
  );
};

export default MessageScreen;
