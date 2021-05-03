import React from 'react';
// state type of authentication user on store
import {connect, ConnectedProps} from 'react-redux';
import {UserInfoState} from '../redux/types';
import AppAuthenticationStack from './AppAuthenticationStack';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Colors} from '../shared/styles';
import MainChatStack from './MainChatStack';

interface RootState {
  userInfo: UserInfoState;
}
//map state to prop
const mapState = (state: RootState) => ({
  userInfo: state.userInfo,
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Prop = PropsFromRedux & {};

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

function AppRootStack({userInfo}: Prop) {
  const isSignedIn = userInfo.isSignedIn;
  return (
    <>
      <View
        style={{height: HEADER_HEIGHT, backgroundColor: Colors.HEADER_BLUE}}>
        <StatusBar
          translucent
          backgroundColor="#5E8D48"
          barStyle="light-content"
        />
      </View>
      <SafeAreaView style={{flex: 1}}>
        {isSignedIn ? <MainChatStack /> : <AppAuthenticationStack />}
      </SafeAreaView>
    </>
  );
}

export default connector(AppRootStack);
