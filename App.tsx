import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Mixins} from './src/shared/styles';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {StyleProvider} from 'native-base';
// @ts-ignore
import getTheme from './native-base-theme/components';
// @ts-ignore
import material from './native-base-theme/variables/platform';
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    width,
    height,
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: Mixins.scaleFont(30),
  },
});
