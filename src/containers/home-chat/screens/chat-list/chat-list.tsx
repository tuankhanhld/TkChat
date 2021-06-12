import React from 'react';
import {ScrollView} from 'react-native';
import UserChatItem from '../../components/user-chat-item';
import {IQuitViewChat} from '../../../../core/models/iquit-view-chat.model';
import {HomeChatNavigationProp} from '../../../../navigatiors/navigation.type';
import {ScreenNameEnum} from '../../../../navigatiors/screen-name.enum';

const quitViewInfo: IQuitViewChat[] = [
  {
    userId: '123',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: true,
  },
  {
    userId: '1234',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: false,
    time: '18:42 PM',
    isActive: true,
  },
  {
    userId: '1235',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: false,
  },
  {
    userId: '123322',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: true,
  },
  {
    userId: '123324',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: true,
  },
  {
    userId: '12332463346',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: true,
  },
  {
    userId: '1236363',
    photoUrl: '123',
    userName: 'Tuan Khanh',
    message: 'Lorem Ipsum is simply dummy 😂',
    isRead: true,
    time: '18:42 PM',
    isActive: true,
  },
];

type Props = {
  navigation: HomeChatNavigationProp;
};

export default function ChatList({navigation}: Props) {
  const navigateToChat = () => {
    navigation.navigate(ScreenNameEnum.MessageBox);
  };
  return (
    <ScrollView style={{marginTop: 10}}>
      {quitViewInfo.map((item) => {
        return (
          <UserChatItem
            key={item.userId}
            quickViewInfo={item}
            onClick={navigateToChat}
          />
        );
      })}
    </ScrollView>
  );
}
