import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {LoadingState} from '../../../redux/types';
import {connect, ConnectedProps} from 'react-redux';
import {store} from '../../../redux/store';

interface RootState {
  loadingState: LoadingState;
}

const mapState = (state: RootState) => ({
  loadingState: state.loadingState,
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

type State = {
  loading: boolean;
};
class LoadingSpinner extends React.Component<Props, State> {
  unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    this.setState({loading: false});
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const isShowLoading = store.getState().toggleSpinner.isShowLoading;
      this.setState({loading: isShowLoading});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.state.loading ? (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    ) : (
      []
    );
  }
}
const styles = StyleSheet.create({
  spinnerContainer: {
    backgroundColor: '#111',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
});

export default connector(LoadingSpinner);
