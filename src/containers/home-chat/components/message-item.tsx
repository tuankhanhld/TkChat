import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import AppText from '../../../shared/components/text-builder/AppText';
import {Thumbnail} from 'native-base';
import {Colors, Mixins, Typography} from '../../../shared/styles';
import {ImessageHolder} from '../../../core/models/imessage-holder.model';

type Props = {
  messageHolder: ImessageHolder;
};
export default function MessageItem({messageHolder}: Props) {
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
  const latestTime =
    messageHolder.messages[messageHolder.messages.length - 1].date;
  return (
    <View style={{padding: 2, marginBottom: 20}}>
      <View
        style={{flexDirection: !messageHolder.isSelf ? 'row' : 'row-reverse'}}>
        <View
          style={{
            paddingVertical: 5,
            flex: 1,
            alignItems: !messageHolder.isSelf ? 'flex-start' : 'flex-end',
          }}>
          <Thumbnail
            style={{width: Mixins.scaleSize(20), height: Mixins.scaleSize(20)}}
            source={require('assets/imgs/avtar_story.png')}
          />
        </View>
        <View style={{flexDirection: 'column', flex: 10}}>
          {messageHolder.messages.map((message) => {
            return (
              <View
                key={message.id}
                style={{
                  flex: 1,
                  alignItems: messageHolder.isSelf ? 'flex-end' : 'flex-start',
                  marginBottom: 10,
                }}>
                <View
                  style={[
                    {
                      backgroundColor: messageHolder.isSelf
                        ? Colors.CHAT_BOX_DEFAULT
                        : Colors.WHITE,
                    },
                    styles.chatBox,
                    messageHolder.isSelf
                      ? styles.boxFlexEnd
                      : styles.boxFlexStart,
                  ]}>
                  <AppText
                    style={{
                      fontSize: Typography.FONT_SIZE_14,
                      fontFamily: Typography.POPPINS_REGULAR,
                      color: !messageHolder.isSelf
                        ? Colors.BLACK
                        : Colors.WHITE,
                    }}>
                    {message.messageContent}
                  </AppText>
                </View>
              </View>
            );
          })}

          <View
            style={{
              flexDirection: !messageHolder.isSelf ? 'row' : 'row-reverse',
              alignItems: 'center',
            }}>
            <AppText
              style={{
                fontSize: Typography.FONT_SIZE_10,
                fontFamily: Typography.POPPINS_REGULAR,
              }}>
              {latestTime}
            </AppText>
            <Image
              style={{marginLeft: 5, marginRight: 5}}
              source={require('assets/imgs/read_icon.png')}
            />
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    padding: 10,
    borderRadius: 10,
  },
  boxFlexEnd: {
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  boxFlexStart: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
});
