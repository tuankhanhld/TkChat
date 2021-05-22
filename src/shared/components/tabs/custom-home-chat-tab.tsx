import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../text-builder/AppText';
import {Colors, Mixins, Typography} from '../../styles';
type Prop = {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
};

export function CustomHomeTopTab({state, descriptors, navigation}: Prop) {
  const routesLength = state.routes.length;
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity>
        <Image source={require('assets/imgs/camera.png')} />
      </TouchableOpacity>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabBarCell}>
            <View>
              <AppText
                style={[
                  {color: isFocused ? Colors.HEADER_BLUE : Colors.BLACK},
                  Typography.FONT_REGULAR,
                ]}>
                {label}
              </AppText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    height: 60,
    marginTop: 10,
  },
  tabBarCellWithBorder: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.SECONDARY,
  },
  tabBarCell: {
    flex: 1,
    alignItems: 'center',
  },
  viewInnderTabBarCell: {
    alignItems: 'center',
    borderBottomWidth: 4,
  },
  title: {
    color: Colors.BLACK,
    fontSize: Mixins.scaleFont(18),
    fontFamily: Typography.AIA_BODY_BOLD,
  },
  tabBarBtnRefresh: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,
  },
  refreshText: {
    color: Colors.WHITE,
    fontSize: Mixins.scaleFont(18),
    fontFamily: Typography.AIA_BODY_BOLD,
  },
});
