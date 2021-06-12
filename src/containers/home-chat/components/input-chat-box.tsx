import {Icon, Input} from 'native-base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Typography} from '../../../shared/styles';
type Props = {
  value?: string;
  textChange?: (value: string) => void;
  style?: ViewStyle;
  placeholder?: string;
  showValidateIcon?: boolean;
  success?: boolean;
  inputAccessoryViewID?: string;
  onSubmitEditing?: () => void;
  onBtnClick?: (
    type: 'SEND' | 'ATTACH' | 'EMOTION' | 'PHOTO' | 'VIDEO',
  ) => void;
};

export default function InputChatBox({
  textChange,
  placeholder,
  inputAccessoryViewID,
  onSubmitEditing,
  value,
  onBtnClick,
}: Props) {
  const [inputValue, setInnerValue] = useState<string>();

  const onTextChange = (value: string) => {
    setInnerValue(value);
    textChange && textChange(value);
  };

  const onBtnClicked = (
    type: 'SEND' | 'ATTACH' | 'EMOTION' | 'PHOTO' | 'VIDEO',
  ) => {
    onBtnClick && onBtnClick(type);
    if (type === 'SEND') {
      setInnerValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => onBtnClicked('EMOTION')}>
          <Image source={require('assets/imgs/chat_emoj_icon.png')} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 6}}>
        <Input
          placeholder={placeholder}
          onChangeText={onTextChange}
          style={styles.input}
          inputAccessoryViewID={inputAccessoryViewID}
          onSubmitEditing={onSubmitEditing}
          value={value}
        />
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          justifyContent: !inputValue ? 'space-around' : 'flex-end',
          alignItems: 'center',
        }}>
        {!inputValue ? (
          <>
            <TouchableOpacity onPress={() => onBtnClicked('ATTACH')}>
              <Image source={require('assets/imgs/chat_attach_icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onBtnClicked('PHOTO')}>
              <Image source={require('assets/imgs/chat_camera_icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onBtnClicked('VIDEO')}>
              <Image source={require('assets/imgs/chat_video_icon.png')} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => onBtnClicked('SEND')}>
            <Icon
              type={'MaterialIcons'}
              name={'send'}
              style={{color: Colors.CHAT_BOX_BUTTON}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  input: {
    width: '100%',
    minHeight: 50,
    maxHeight: 50,
    borderColor: Colors.WHITE,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: Typography.POPPINS_REGULAR,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});
