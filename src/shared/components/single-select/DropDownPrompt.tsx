import React from 'react';
import {Icon, Text, View} from 'native-base';
import {FlatList, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography} from '../../styles';
import {UIManager, findNodeHandle} from 'react-native';
/**
 * Single select component guide
 * Required Props:
 * data: data with array format. Ex: [{id:... , text:...}] or string array
 * initSelectedId: initial value when render single select
 * keyShown: key search on object
 * onSelected: fired when user select item
 */
type Prop = {
  data: any[];
  onSelected?: (item: any) => void;
  initSelectedId: string | number;
  keyShown: string;
  placeholder?: string;
  showCheckIcon?: boolean;
};

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

const initialState: State = {
  selectedItem: null,
  isOpened: false,
  labelSelected: '',
  data: [],
  dataOrigin: [],
  firstGetMeasure: false,
};

export class DropDownPrompt extends React.Component<Prop, State> {
  static defaultProps = {
    placeholder: 'Select Value',
    showCheckIcon: true,
  };

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
        this.onSelectedItem(foundInitItem, false, data);
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

  onSelectedItem(item: any, closed: boolean = true, data?: any[]) {
    const selectedItem = (data || this.state.dataOrigin).find(
      (x) => x.id === item.id,
    );
    this.props.onSelected && this.props.onSelected(selectedItem);
    this.setState({
      labelSelected: item.value,
      selectedItem: item,
    });
    closed && this.onFocusInput();
  }

  onFocusInput() {
    this.setState((prevState) => {
      return {
        ...prevState,
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

  renderItem(item: any) {
    return (
      <TouchableOpacity
        onPress={() => this.onSelectedItem(item, true)}
        style={styles.listItem}>
        <View>
          <Text style={styles.textItem}>{item.value}</Text>
          {this.props.showCheckIcon &&
            this.state.selectedItem &&
            this.state.selectedItem.id === item.id && (
              <Icon type="FontAwesome" name="check" style={styles.itemIcon} />
            )}
        </View>
      </TouchableOpacity>
    );
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
            py: py + 40,
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

  render() {
    const {labelSelected, isOpened, measure} = this.state;
    const {placeholder} = this.props;
    return (
      <View ref={(ref) => (this.view = ref)} style={styles.container}>
        <TouchableOpacity
          onPress={this.onFocusInput.bind(this)}
          style={styles.selectedItemContainer}>
          <>
            {labelSelected ? (
              <Text style={styles.textItem}> {this.state.labelSelected} </Text>
            ) : (
              <Text style={[styles.textItem, {opacity: 0.7}]}>
                {' '}
                {placeholder ? placeholder : 'Select Value'}{' '}
              </Text>
            )}
            <Icon
              type="FontAwesome"
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.iconClear}
            />
          </>
        </TouchableOpacity>
        {this.state.isOpened && (
          <Modal transparent visible={true}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => this.onFocusInput()}
            />
            <View
              style={[
                styles.dropDownContainer,
                {
                  top: measure?.py || 0,
                  width: measure?.width || '100%',
                  left: measure?.px || 0,
                },
              ]}>
              {this.props.data.length > 0 && (
                <View style={styles.listItemContainer}>
                  <FlatList
                    style={{height: this.state.data.length * 40}}
                    data={this.state.data}
                    initialNumToRender={4}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item: any) => item.id.toString()}
                    extraData={this.state.selectedItem}
                  />
                </View>
              )}
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  selectedItemContainer: {
    marginBottom: 5,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  dropDownContainer: {
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowOffset: {width: 0, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.27,
    elevation: 3,
  },
  listItemContainer: {
    flex: 1,
  },
  listItem: {
    height: 40,
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 17,
    position: 'absolute',
    right: 10,
    color: Colors.BLUE,
  },
  textItem: {
    fontFamily: Typography.FONT_ROBOTO,
    color: Colors.TEXT_TITLE,
  },
  iconClear: {
    fontSize: 17,
    position: 'absolute',
    right: 20,
    color: Colors.TEXT_TITLE,
  },
});
