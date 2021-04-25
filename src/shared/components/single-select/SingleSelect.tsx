import React from 'react';
import {Icon, Text, View} from 'native-base';
import {
  findNodeHandle,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Colors, Typography} from '../../styles';

/**
 * Single select component guide
 * Required Props:
 * data: data with array format. Ex: [{id:... , text:...}] or string array
 * initSelectedId: initial value when render single select
 * keyShown: key search on object
 * onSelected: fired when user select item
 */
type State = {
  selectedItem: any;
  isOpened: boolean;
  labelSelected: string;
  data: any[];
  dataOrigin: any[];
  measure?: {
    width: number;
    height: number;
    px: number;
    py: number;
  };
  firstGetMeasure: boolean;
};

type Prop = {
  data: any[];
  onSelected?: (item: any) => void;
  initSelectedId: string | number;
  keyShown: string;
  placeholder?: string;
  disabled?: boolean;
};
const initialState: State = {
  selectedItem: null,
  isOpened: false,
  labelSelected: '',
  data: [],
  dataOrigin: [],
  firstGetMeasure: false,
};
export class SingleSelect extends React.Component<Prop, State> {
  view: any;
  constructor(props: Prop) {
    super(props);
    const dataPreProcessing = this.preProcessingDataInput(this.props.data);
    this.state = {
      ...initialState,
      data: dataPreProcessing,
      dataOrigin: this.props.data,
    };
  }

  componentDidMount(): void {
    const {initSelectedId, data} = this.props;
    const foundInitItem =
      data[0] && typeof data[0] === 'string'
        ? this.state.data.find(
            (x) => x && x.value && x.value === initSelectedId,
          )
        : this.state.data.find((x) => x && x.id && x.id === initSelectedId);
    if (foundInitItem) {
      this.onSelectedItem(foundInitItem, false);
    }
  }

  shouldComponentUpdate(
    nextProps: Readonly<Prop>,
    nextState: Readonly<State>,
    nextContext: any,
  ): boolean {
    if (nextProps.data !== this.state.dataOrigin) {
      const dataPreProcessing = this.preProcessingDataInput(nextProps.data);
      this.setState({
        data: dataPreProcessing,
        dataOrigin: nextProps.data,
      });
      const {initSelectedId, data} = nextProps;
      const foundInitItem =
        data[0] && typeof data[0] === 'string'
          ? dataPreProcessing.find(
              (x) => x && x.value && x.value === initSelectedId,
            )
          : dataPreProcessing.find((x) => x && x.id && x.id === initSelectedId);
      if (foundInitItem) {
        this.onSelectedItem(foundInitItem, false);
      }
    }
    return true;
  }

  preProcessingDataInput(data: any[]): {id: any; value: string}[] {
    if (data[0] && typeof data[0] === 'string') {
      return data.map((x, index) => {
        return {
          id: index,
          value: x,
        };
      });
    }
    return data.map((x) => {
      return {
        id: x.id,
        value: x[this.props.keyShown],
      };
    });
  }

  onSelectedItem(item: any, closed: boolean = true) {
    this.setState({
      labelSelected: item.value,
      selectedItem: item,
    });
    closed && this.onFocusInput();
    const selectedItem = this.state.dataOrigin.find((x) => x.id === item.id);
    this.props.onSelected && this.props.onSelected(selectedItem);
  }

  onFocusInput() {
    this.setState((prevState) => {
      return {
        ...prevState,
        // isOpened: !prevState.isOpened,
        query: '',
        dataFiltered: [],
      };
    });
    this.measure();
  }

  getItem(data: any[], index: number) {
    if (data[0] && typeof data[0] === 'string') {
      return {
        id: index,
        value: data[index],
      };
    }
    return {
      id: data[index].id,
      value: data[index].value,
    };
  }

  clearSelected() {
    this.setState({
      ...initialState,
    });
    this.props.onSelected && this.props.onSelected(null);
  }

  measure() {
    if (this.view) {
      UIManager.measure(
        findNodeHandle(this.view) || 0,
        (x, y, width, height, px, py) => {
          const newMeasure = {
            width,
            height,
            px,
            py: py + 60,
          };
          const {measure} = this.state;
          const isNotChangePosition =
            measure && JSON.stringify(newMeasure) === JSON.stringify(measure);
          if (isNotChangePosition) {
            this.setState((prevState) => {
              return {
                ...prevState,
                isOpened: !prevState.isOpened,
              };
            });
            return;
          }
          this.setState((prevState) => {
            return {
              ...prevState,
              measure: newMeasure,
              firstGetMeasure: true,
              isOpened: !prevState.isOpened,
            };
          });
        },
      );
    }
  }

  renderItem(item: any) {
    return (
      <TouchableOpacity
        onPress={this.onSelectedItem.bind(this, item, true)}
        style={styles.listItem}>
        <View>
          <Text style={styles.textItem}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {labelSelected, isOpened, measure} = this.state;
    const {placeholder, disabled} = this.props;
    return (
      <View
        ref={(ref) => (this.view = ref)}
        style={styles.container}
        onResponderMove={(evt) => console.log(evt)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.onFocusInput.bind(this)}
          style={[
            styles.selectedItemContainer,
            disabled && styles.disabledItemContainer,
          ]}
          disabled={disabled}>
          <>
            {labelSelected ? (
              <Text style={styles.textItem}>
                {' '}
                {!disabled ? this.state.labelSelected : ''}{' '}
              </Text>
            ) : (
              <Text style={[styles.textItem, {opacity: 0.7}]}>
                {' '}
                {placeholder ? placeholder : 'Select Value'}{' '}
              </Text>
            )}
            <Icon
              type="MaterialIcons"
              name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              style={styles.iconClear}
            />
          </>
        </TouchableOpacity>
        {this.state.isOpened && (
          <Modal transparent visible={true}>
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={() => this.onFocusInput()}
              />
              <View
                style={[
                  styles.dropDownContainer,
                  {
                    top: measure?.py || 0,
                    width: measure?.width || 250,
                    left: measure?.px || 0,
                  },
                ]}>
                {this.props.data.length > 0 && (
                  <View style={styles.listItemContainer}>
                    <FlatList
                      style={{
                        height:
                          this.props.data.length < 5
                            ? this.props.data.length * 40
                            : 200,
                      }}
                      data={this.state.data}
                      initialNumToRender={4}
                      renderItem={({item}) => this.renderItem(item)}
                      keyExtractor={(item: any) => item.id.toString()}
                      extraData={this.state.selectedItem}
                    />
                  </View>
                )}
              </View>
            </>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  selectedItemContainer: {
    marginBottom: 5,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 27,
  },
  disabledItemContainer: {
    opacity: 0.6,
    backgroundColor: '#f0eee175',
  },
  dropDownContainer: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
    borderRadius: 20,
  },
  listItemContainer: {
    flex: 1,
  },
  listItem: {
    height: 40,
    justifyContent: 'center',
  },
  textItem: {
    fontFamily: Typography.FONT_ROBOTO,
    color: Colors.BLACK,
  },
  iconClear: {
    fontSize: 26,
    position: 'absolute',
    right: 8,
    color: Colors.BLACK,
  },
});
