import React, {useState} from 'react';
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MessageItem from '../../components/message-item';
import {ImessageHolder} from '../../../../core/models/imessage-holder.model';
import {Imessage} from '../../../../core/models/imessage.model';
import InputChatBox from '../../components/input-chat-box';

export default function MessageBoxScreen() {
  const [messageHolders, setMessageHolders] = useState<Array<ImessageHolder>>(
    [],
  );
  const [messageTyping, setMessageTyping] = useState('');

  const addMessage = () => {
    const message: Imessage = {
      id: new Date().getTime().toString(),
      isRead: true,
      messageContent: messageTyping,
      messageType: 'TEXT',
      date: new Date().toDateString(),
    };

    let lastMessageHolder: ImessageHolder | undefined;
    if (messageHolders.length > 0) {
      lastMessageHolder = messageHolders[messageHolders.length - 1];
    }
    if (lastMessageHolder && lastMessageHolder.isSelf) {
      // @ts-ignore
      const foundMessageHolder: ImessageHolder = messageHolders.find(
        (holder) => holder.id === lastMessageHolder?.id,
      );
      if (foundMessageHolder) {
        foundMessageHolder.messages.push(message);
        const newMessageHolders = JSON.parse(JSON.stringify(messageHolders));
        setMessageHolders(newMessageHolders);
      }
    } else {
      const messageHolder: ImessageHolder = {
        id: '4',
        userPhotoUrl: '',
        messages: [message],
        isSelf: true,
      };
      messageHolders.push(messageHolder);
      const newMessageHolders = JSON.parse(JSON.stringify(messageHolders));
      setMessageHolders(newMessageHolders);
    }
    setMessageTyping('');
  };

  const onBtnClicked = (
    type: 'SEND' | 'ATTACH' | 'EMOTION' | 'PHOTO' | 'VIDEO',
  ) => {
    switch (type) {
      case 'SEND':
        addMessage();
        break;
      default:
        break;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, flexDirection: 'column'}}
      enabled
      keyboardVerticalOffset={120}>
      <View style={{flex: 1}}>
        <View style={{flex: 9, paddingVertical: 10}}>
          <ScrollView>
            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
              {messageHolders.map((message) => {
                return <MessageItem key={message.id} messageHolder={message} />;
              })}
            </View>
          </ScrollView>
        </View>
        <View
          style={{flex: 1, paddingHorizontal: 10, justifyContent: 'center'}}>
          <InputChatBox
            textChange={setMessageTyping}
            onSubmitEditing={addMessage}
            value={messageTyping}
            onBtnClick={onBtnClicked}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
