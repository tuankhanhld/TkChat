import React from 'react';
import {Text} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {TextStyle} from 'react-native';
import {LocalizedState} from '../../../redux/types';
import I18n from 'i18n-js';

interface RootState {
  changeLanguageReducer: LocalizedState;
}
//map state to prop
const mapStateToProp = (state: RootState) => ({
  changeLanguageReducer: state.changeLanguageReducer,
});

const connector = connect(mapStateToProp, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  i18nKey?: string;
  style?: TextStyle | TextStyle[];
  children?: any;
  isUpperCase?: boolean;
  numberOfLines?: number;
  notAutoChangeFontOnLangChanged?: boolean;
  isTextValue?: boolean;
};

type State = {
  i18n: typeof I18n;
  lang: string;
};
class AppText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      i18n: I18n,
      lang: this.props.changeLanguageReducer.activeLanguage,
    };
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.changeLanguageReducer.activeLanguage !== state.lang) {
      return {
        lang: props.changeLanguageReducer.activeLanguage,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  setMainLocaleLanguage = (language: string) => {
    this.setState({lang: language});
  };

  render() {
    const {i18nKey, style, isUpperCase} = this.props;
    const {i18n} = this.state;
    return (
      <Text style={style} numberOfLines={this.props.numberOfLines}>
        {i18nKey
          ? isUpperCase
            ? i18n.t(i18nKey).toUpperCase()
            : i18n.t(i18nKey)
          : this.props.children}
      </Text>
    );
  }
}

export default connector(AppText);
