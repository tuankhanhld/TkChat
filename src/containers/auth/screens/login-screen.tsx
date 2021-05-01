import {Button, Icon} from 'native-base';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AppText from '../../../shared/components/text-builder/AppText';
import {Colors, Mixins, Typography} from '../../../shared/styles';
import {UserInfoState} from '../../../redux/types';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
import {SingleSelect} from '../../../shared/components/single-select/SingleSelect';
import InputText from '../../../shared/components/input-text/input-text';
import {COUNTRY_LIST} from '../../../assets/mock/countries';
import {loginStyles as styles} from './login-screen.style';
import {ScreenNameEnum} from '../../../navigatiors/screen-name.enum';
import {LoginScreenNavigationProp} from '../../../navigatiors/navigation.type';

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
  navigation: LoginScreenNavigationProp;
};

function LoginScreen({userInfo, navigation}: Prop) {
  const countries = JSON.parse(JSON.stringify(COUNTRY_LIST));
  countries.forEach((con: any) => {
    con.id = con.code;
  });

  const navigateToVerifyCode = () => {
    navigation.navigate(ScreenNameEnum.CodeVerifyScreen);
  };

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
          <View style={styles.topSection}>
            <View style={styles.innerViewTop}>
              <View style={{flexDirection: 'row'}}>
                <AppText
                  style={[
                    Typography.FONT_BOLD,
                    {fontSize: Mixins.scaleFont(30), color: Colors.BLUE},
                  ]}>
                  Bestie
                </AppText>
                <AppText
                  style={[
                    Typography.FONT_BOLD,
                    {fontSize: Mixins.scaleFont(30)},
                  ]}>
                  Chat
                </AppText>
              </View>
              <AppText
                style={[
                  Typography.FONT_REGULAR,
                  {fontSize: Typography.FONT_SIZE_18, color: Colors.GRAY_DARK},
                ]}>
                Feel Free Chat & Always Secure
              </AppText>
            </View>
          </View>
          <View style={styles.logoSection}>
            <View style={{flex: 1}}>
              <Image
                style={styles.logoImg}
                source={require('assets/imgs/login_logo.png')}
              />
            </View>
          </View>
          <View style={styles.formSection}>
            <AppText
              style={[
                {paddingBottom: 20, paddingTop: 10},
                Typography.FONT_REGULAR,
              ]}>
              Enter your mobile number to login or register
            </AppText>
            <View style={{flex: 1}}>
              <AppText
                style={[
                  {paddingVertical: 10, color: Colors.GRAY_DARK},
                  Typography.FONT_REGULAR,
                ]}>
                Country
              </AppText>
              <SingleSelect
                data={countries}
                initSelectedId={'VN'}
                keyShown={'name'}
              />
              <AppText
                style={[
                  {paddingVertical: 10, color: Colors.GRAY_DARK},
                  Typography.FONT_REGULAR,
                ]}>
                Phone Number
              </AppText>
              <InputText showValidateIcon />
              <View style={styles.bottomButton}>
                <Button
                  onPress={navigateToVerifyCode}
                  iconRight
                  primary
                  rounded
                  style={{height: 50, backgroundColor: Colors.ORANGE}}>
                  <AppText style={Typography.FONT_REGULAR}>Next</AppText>
                  <Icon type={'MaterialIcons'} name="arrow-forward" />
                </Button>
              </View>
            </View>
            <View />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default connector(LoginScreen);
