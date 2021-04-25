import {Icon, Input, Item} from 'native-base';
import {StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../styles';
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
    <Item
      style={styles.item}
      rounded
      success={innerValue !== null && innerValue !== ''}>
      <Input
        onChangeText={onTextChange}
        style={[styles.input, style]}
        placeholder={placeholder}
      />
      <Icon name="checkmark-circle" />
    </Item>
  ) : (
    <Item style={styles.item} rounded>
      <Input
        onChangeText={onTextChange}
        style={[styles.input, style]}
        value={value}
        placeholder={placeholder}
      />
    </Item>
  );
}

const styles = StyleSheet.create({
  item: {
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
    width: '100%',
    height: 50,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
  },
  input: {
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
});
