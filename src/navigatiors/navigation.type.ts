import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenNameEnum} from './screen-name.enum';
type ScreenNames = keyof typeof ScreenNameEnum;
export type AppRootNavigation = {[P in ScreenNames]: any};
export type AuthNavigation = Pick<
  AppRootNavigation,
  'LoginScreen' | 'CodeVerifyScreen'
>;

export type MainChatNavigation = Pick<
  AppRootNavigation,
  'HomeChatScreen' | 'SettingsScreen' | 'MessageBox'
>;

// login screen stack type
export type LoginScreenNavigationProp = StackNavigationProp<
  AppRootNavigation,
  ScreenNameEnum.LoginScreen
>;

// home screen navigation prop types
export type CodeVerifyNavigationProp = StackNavigationProp<
  AppRootNavigation,
  ScreenNameEnum.CodeVerifyScreen
>;

// home screen navigation prop types
export type HomeChatNavigationProp = StackNavigationProp<
  AppRootNavigation,
  ScreenNameEnum.HomeChatScreen
>;
