import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNameEnum} from './screen-name.enum';
import {MainChatNavigation} from './navigation.type';
import HomeChat from '../containers/home-chat/home';
import {Image, TouchableOpacity, View} from 'react-native';
import AppText from '../shared/components/text-builder/AppText';
import {Colors} from '../shared/styles';

const Stack = createStackNavigator<Partial<MainChatNavigation>>();
export default class MainChatStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNameEnum.HomeChatScreen}
          component={HomeChat}
          options={{
            title: 'Home',
            headerShown: true,
            headerBackTitleStyle: {
              color: 'black',
            },
            headerTitleStyle: {
              display: 'none',
            },
            headerStyle: {
              height: 60,
              backgroundColor: Colors.HEADER_BLUE,
            },
            headerLeft: (props: any) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 40,
                      backgroundColor: '#ccc',
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image source={require('assets/imgs/avtar_story.png')} />
                  </View>
                  <AppText style={{marginLeft: 10, color: 'white'}}>
                    Hi, Khanh
                  </AppText>
                </TouchableOpacity>
              );
            },
            headerRight: (props: any) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <Image
                      style={{marginRight: 16}}
                      source={require('assets/imgs/search.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('assets/imgs/menu_solid.png')} />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}
