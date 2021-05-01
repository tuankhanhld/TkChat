import React from 'react';
// state type of authentication user on store
import {connect, ConnectedProps} from 'react-redux';
import {UserInfoState} from '../redux/types';
import AppAuthenticationStack from './AppAuthenticationStack';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon} from 'native-base';
import {SafeAreaView} from 'react-navigation';

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

function AppRootStack() {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*<View style={{paddingHorizontal: 10}}>*/}
      {/*  <TouchableOpacity>*/}
      {/*    <Icon type={'MaterialIcons'} name="arrow-back" />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      <AppAuthenticationStack />
    </SafeAreaView>
  );
}

export default connector(AppRootStack);
