import React from 'react';
// state type of authentication user on store
import {connect, ConnectedProps} from 'react-redux';
import {UserInfoState} from '../redux/types';
import LoginScreen from '../containers/auth/screens/login-screen';

interface RootState {
  userInfo: UserInfoState;
}
//map state to prop
const mapState = (state: RootState) => ({
  userInfo: state.userInfo,
});

const connector = connect(mapState, null);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Prop = PropsFromRedux & {};

function AppRootStack({}: Prop) {
  return <LoginScreen />;
}

export default connector(AppRootStack);
