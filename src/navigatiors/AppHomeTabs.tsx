import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';
import {CustomHomeTopTab} from '../shared/components/tabs/custom-home-chat-tab';
import {Colors} from '../shared/styles';
import ChatList from '../containers/home-chat/screens/chat-list/chat-list';
const Tab = createMaterialTopTabNavigator();

export default class HomeTopTabsNavigator extends React.Component<any, any> {
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 18},
          style: {backgroundColor: Colors.WHITE},
        }}
        tabBar={(props: any) => <CustomHomeTopTab {...props} />}
        lazy
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen name={'Chat'} component={ChatList} />
        <Tab.Screen name={'Group'} component={ChatList} />
        <Tab.Screen name={'Post'} component={ChatList} />
        <Tab.Screen name={'Call'} component={ChatList} />
        <Tab.Screen name={'Status'} component={ChatList} />
      </Tab.Navigator>
    );
  }
}
