import {Icon, Input} from 'native-base';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Colors, Typography} from '../../styles';
import React, {useState} from 'react';
type Props = {
  value?: string;
  textChange?: (value: string) => string;
  style?: ViewStyle;
  placeholder?: string;
  showValidateIcon?: boolean;
  success?: boolean;
};

export default function InputText({
  textChange,
  value,
  style,
  placeholder,
  showValidateIcon,
}: Props) {
  const [innerValue, setInnerValue] = useState<string>();

  const onTextChange = (value: string) => {
    setInnerValue(value);
    textChange && textChange(value);
  };

  return showValidateIcon ? (
    <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
      <Input
        placeholder={placeholder}
        onChangeText={onTextChange}
        style={[styles.input, style]}
      />
      <Icon
        name="checkmark-circle"
        style={[styles.icon, {color: innerValue ? 'green' : 'black'}]}
      />
    </View>
  ) : (
    <Input
      placeholder={placeholder}
      onChangeText={onTextChange}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
    width: '100%',
    minHeight: 50,
    maxHeight: 50,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 10,
    fontFamily: Typography.POPPINS_REGULAR,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});
