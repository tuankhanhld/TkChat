import {StyleSheet} from 'react-native';
import {Mixins} from '../../../shared/styles';

export const loginStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  topSection: {
    paddingBottom: 30,
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
  logoImg: {
    alignSelf: 'center',
  },
  formSection: {
    flex: 5,
  },
  bottomButton: {
    paddingTop: Mixins.verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
