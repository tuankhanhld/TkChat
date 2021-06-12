import {Button, Icon, Item} from 'native-base';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../../shared/components/text-builder/AppText';
import {Colors, Mixins, Typography} from '../../../shared/styles';
import {UserInfoState} from '../../../redux/types';
import {connect, ConnectedProps} from 'react-redux';
import React, {useState} from 'react';
import {COUNTRY_LIST} from '../../../assets/mock/countries';
import {codeVerifyStyles as styles} from './code-verifier.style';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import {CodeVerifyNavigationProp} from '../../../navigatiors/navigation.type';
import {ScreenNameEnum} from '../../../navigatiors/screen-name.enum';

interface RootState {
  userInfo: UserInfoState;
}
//map state to prop
const mapState = (state: RootState) => ({
  userInfo: state.userInfo,
});

const mapDispatch = {
  onLogin: (userData: any) => ({
    type: 'SEND_LOGIN',
    userInfor: userData,
  }),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Prop = PropsFromRedux & {
  navigation: CodeVerifyNavigationProp;
};
const CELL_COUNT = 6;
function CodeVerifierScreen({userInfo, navigation}: Prop) {
  const countries = JSON.parse(JSON.stringify(COUNTRY_LIST));
  countries.forEach((con: any) => {
    con.id = con.code;
  });

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerifyCode = () => {
    navigation.navigate(ScreenNameEnum.HomeChatScreen);
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={styles.topSection}>
            <View style={styles.innerViewTop}>
              <View style={{flexDirection: 'row'}}>
                <AppText
                  style={[
                    Typography.FONT_BOLD,
                    {fontSize: Mixins.scaleFont(30)},
                  ]}>
                  Verify Your Phone No
                </AppText>
              </View>
              <AppText
                style={[
                  Typography.FONT_REGULAR,
                  {fontSize: Typography.FONT_SIZE_18},
                  {paddingHorizontal: 20, textAlign: 'center'},
                ]}>
                An 6-digit code has been sent to Register Mobile Number (change)
              </AppText>
            </View>
          </View>
          <View style={styles.logoSection}>
            <View style={{flex: 1}}>
              <Image
                style={styles.logoImg}
                source={require('assets/imgs/verify_icon.png')}
              />
            </View>
          </View>
          <View style={styles.formSection}>
            <View style={{flexDirection: 'row'}}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <AppText
                style={[
                  {paddingBottom: 20, paddingTop: 10},
                  Typography.FONT_REGULAR,
                ]}>
                Expired in 09:59
              </AppText>
            </View>
            <View style={styles.bottomButton}>
              <Button
                onPress={handleVerifyCode}
                primary
                rounded
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: Colors.ORANGE,
                  justifyContent: 'center',
                }}>
                <AppText style={Typography.FONT_BOLD}>VERIFY</AppText>
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <AppText
                style={{
                  paddingBottom: 20,
                  paddingTop: 10,
                  fontFamily: Typography.POPPINS_REGULAR,
                }}>
                Don't receive the code?
              </AppText>
              <TouchableOpacity>
                <AppText
                  style={{
                    paddingBottom: 20,
                    paddingTop: 10,
                    color: Colors.BLUE,
                    fontFamily: Typography.POPPINS_REGULAR,
                  }}>
                  {' Resend'}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default connector(CodeVerifierScreen);
