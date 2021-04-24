import React, {Component} from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Colors, Mixins, Typography} from '../../styles';
import AppText from '../text-builder/AppText';

type ModalProp = {
  title: string;
  onCloseModal: Function;
  onAccept: Function;
  typeMode: 'VIEW' | 'CONFIRM';
  isOpenned: boolean;
};

type State = {
  Alert_Visibility: boolean;
};

export default class ModalContainer extends Component<ModalProp, State> {
  constructor(props: ModalProp) {
    super(props);
    this.state = {
      Alert_Visibility: this.props.isOpenned,
    };
  }

  cancelAlertBox(visible: boolean) {
    this.setState({Alert_Visibility: visible});
  }

  onButtonClicked(visible: boolean) {
    this.setState({Alert_Visibility: visible});
    if (visible) {
      this.props.onAccept();
    } else {
      this.props.onCloseModal();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.props.isOpenned}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.cancelAlertBox(!this.state.Alert_Visibility);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(45,45,45,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.MainAlertView}>
              <View style={styles.headerModal}>
                <Text style={styles.AlertTitle}>{this.props.title}</Text>
              </View>
              <View style={styles.modalBody}>{this.props.children}</View>
              {this.props.typeMode !== 'VIEW' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    height: 50,
                  }}>
                  <View style={{alignItems: 'center', width: '50%'}}>
                    <TouchableOpacity
                      style={[
                        styles.buttonStyle,
                        {backgroundColor: Colors.CANCEL_BTN},
                      ]}
                      onPress={() => {
                        this.onButtonClicked(false);
                      }}
                      activeOpacity={0.7}>
                      <AppText
                        isUpperCase
                        i18nKey={'buttons.buttonClose'}
                        style={styles.TextStyle}>
                        {' '}
                        OK{' '}
                      </AppText>
                    </TouchableOpacity>
                  </View>
                  <View style={{alignItems: 'center', width: '50%'}}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() => {
                        this.onButtonClicked(true);
                      }}
                      activeOpacity={0.7}>
                      <AppText
                        isUpperCase
                        i18nKey={'buttons.buttonOk'}
                        style={styles.TextStyle}>
                        {' '}
                        OK{' '}
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    height: 50,
                  }}>
                  <View style={{alignItems: 'center', width: '50%'}}>
                    <TouchableOpacity
                      style={[
                        styles.buttonStyle,
                        {backgroundColor: Colors.CANCEL_BTN},
                      ]}
                      onPress={() => {
                        this.onButtonClicked(false);
                      }}
                      activeOpacity={0.7}>
                      <AppText
                        isUpperCase
                        i18nKey={'buttons.buttonClose'}
                        style={styles.TextStyle}>
                        {' '}
                        CLOSE{' '}
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  MainAlertView: {
    backgroundColor: Colors.WHITE,
    minHeight: 500,
    maxHeight: 700,
    width: '70%',
    borderColor: '#fff',
    paddingBottom: 20,
  },
  headerModal: {
    backgroundColor: Colors.MAIN_RED,
    width: '100%',
    top: 0,
  },
  modalBody: {
    minHeight: 100,
    maxHeight: 400,
    padding: 16,
    flex: 1,
    overflow: 'scroll',
  },
  AlertTitle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: Mixins.scaleFont(25),
    fontFamily: Typography.AIA_HEADING,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  AlertMessage: {
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    height: '40%',
  },
  buttonStyle: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MAIN_RED,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: Mixins.scaleFont(25),
    fontFamily: Typography.AIA_HEADING,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
});
