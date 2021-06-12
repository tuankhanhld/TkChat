import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNameEnum} from './screen-name.enum';
import LoginScreen from '../containers/auth/screens/login-screen';
import {AuthNavigation} from './navigation.type';
import CodeVerifierScreen from '../containers/auth/screens/code-verifier';
import {Icon} from 'native-base';

const Stack = createStackNavigator<Partial<AuthNavigation>>();
export default class AppAuthenticationStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNameEnum.LoginScreen}
          component={LoginScreen}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNameEnum.CodeVerifyScreen}
          component={CodeVerifierScreen}
          options={{
            title: 'Code Verify',
            headerShown: true,
            headerTitleStyle: {
              display: 'none',
            },
            headerBackTitleStyle: {
              color: 'black',
            },
            headerBackImage: (props: any) => {
              return <Icon type={'MaterialIcons'} name="arrow-back" />;
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}
