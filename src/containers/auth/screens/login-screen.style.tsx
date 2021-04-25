import {StyleSheet} from 'react-native';
import {Mixins} from '../../../shared/styles';

export const loginStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingTop: 20,
  },
  topSection: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerViewTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    flex: 3,
  },
  logoImg: {},
  formSection: {
    flex: 5,
  },
  bottomButton: {
    paddingTop: Mixins.verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
