import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Mixins} from './src/shared/styles';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {NavigationContainer} from '@react-navigation/native';
import AppRootStack from './src/navigatiors/AppRootStack';

export class App extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <NavigationContainer>
              <AppRootStack />
            </NavigationContainer>
          </StyleProvider>
        </Provider>
      </View>
    );
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    fontSize: Mixins.scaleFont(30),
  },
});
