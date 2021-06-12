import {ViewStyle} from 'react-native';
import {Colors} from './index';

export const PAGE_CARD_CONTAINER = {
  flex: 1,
  paddingRight: 6,
  padding: 10,
  backgroundColor: 'white',
};

export const PAGE_CARD_ITEM: ViewStyle = {
  padding: 5,
  flex: 1,
};

export const ROW: ViewStyle = {
  paddingVertical: 5,
  flexDirection: 'row',
  flex: 1,
};

export const CHAT_BOX: ViewStyle = {
  padding: 10,
  backgroundColor: Colors.WHITE,
  borderRadius: 10,
  // shadowOffset: {width: 0, height: 3},
  // shadowColor: 'black',
  // shadowOpacity: 0.27,
  // elevation: 3,
};
