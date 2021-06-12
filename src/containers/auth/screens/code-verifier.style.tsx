import {StyleSheet} from 'react-native';
import {Mixins} from '../../../shared/styles';

export const codeVerifyStyles = StyleSheet.create({
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

  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    textAlign: 'center',
    textAlignVertical: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
    borderRadius: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
  codeFieldRoot: {marginTop: 20, flex: 1, justifyContent: 'space-around'},
});
