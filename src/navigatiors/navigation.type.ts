import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ScreenNameEnum} from './screen-name.enum';
type ScreenNames = keyof typeof ScreenNameEnum;
export type AppRootNavigation = {[P in ScreenNames]: any};
export type AuthNavigation = Pick<
  AppRootNavigation,
  'LoginScreen' | 'CodeVerifyScreen'
>;
// login screen stack type
export type LoginScreenNavigationProp = StackNavigationProp<
  AppRootNavigation,
  ScreenNameEnum.LoginScreen
>;

// home screen navigation prop types
export type CodeVerifyNavigationProp = DrawerNavigationProp<
  AppRootNavigation,
  ScreenNameEnum.CodeVerifyScreen
>;
