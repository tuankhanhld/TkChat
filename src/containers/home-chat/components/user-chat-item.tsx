import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../../../shared/components/text-builder/AppText';
import {Colors, Typography} from '../../../shared/styles';
import {IQuitViewChat} from '../../../core/models/iquit-view-chat.model';

type Props = {
  quickViewInfo: IQuitViewChat;
  onClick?: (userId: string) => void;
};

export default function UserChatItem({quickViewInfo, onClick}: Props) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemInnerContainer}
        onPress={() => onClick && onClick(quickViewInfo.userId)}>
        <View style={{padding: 5}}>
          <Image source={require('assets/imgs/avtar_story.png')} />
          <View style={styles.activeIconContainer}>
            <View
              style={[
                styles.activeIconInnerContainer,
                {
                  backgroundColor: quickViewInfo.isActive
                    ? Colors.USER_ACTIVE
                    : Colors.USER_INACTIVE,
                },
              ]}
            />
          </View>
        </View>
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <AppText
            style={[
              Typography.FONT_REGULAR,
              {fontSize: Typography.FONT_SIZE_18},
            ]}>
            Tuan khanh
          </AppText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                quickViewInfo.isRead
                  ? require('assets/imgs/read_icon.png')
                  : require('assets/imgs/unread_icon.png')
              }
            />
            <AppText
              style={[
                {marginLeft: 5},
                Typography.FONT_REGULAR,
                {color: Colors.TEXT_DARK, fontSize: Typography.FONT_SIZE_12},
              ]}>
              Lorem Ipsum is simply dummy 😀
            </AppText>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <AppText
            style={[
              Typography.FONT_REGULAR,
              {fontSize: Typography.FONT_SIZE_10},
            ]}>
            18:42 PM
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    paddingVertical: 5,
  },
  itemInnerContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  timeContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
  },
  activeIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 4,
    height: 14,
    width: 14,
    backgroundColor: Colors.WHITE,
    shadowOffset: {width: 0, height: 6},
    shadowColor: 'black',
    shadowOpacity: 0.15,
    elevation: 3,
  },
  activeIconInnerContainer: {
    backgroundColor: Colors.USER_ACTIVE,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
