import React from 'react';
// state type of authentication user on store
import {connect, ConnectedProps} from 'react-redux';
import {Text} from 'react-native';
import {UserInfoState} from '../redux/types';

interface RootState {
  userInfo: UserInfoState;
}
//map state to prop
const mapState = (state: RootState) => ({
  userInfo: state.userInfo,
});

const mapDispatch = {
  onLoginSuccess: (userData: any) => ({
    type: 'SEND_LOGIN',
    userInfor: userData,
  }),
  onLogintErr: (errCode: number, errMessage: string) => ({
    type: 'LOGOUT_ERROR',
    errCode,
    errMessage,
  }),
  onLogoutSuccess: () => ({type: 'SEND_LOG_OUT'}),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Prop = PropsFromRedux & {};

type State = {
  isSignined: boolean;
  allowShowScreen: boolean;
};

function AppRootStack({}: Prop) {
  return <Text>Hello</Text>;
}

export default connector(AppRootStack);
