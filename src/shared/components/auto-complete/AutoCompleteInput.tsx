import React from 'react';
import {Icon, Input, Text, View} from 'native-base';
import {
  findNodeHandle,
  Modal,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  VirtualizedList,
} from 'react-native';
import {Colors, Typography} from '../../styles';

/**
 * Auto complete component guide
 * Required Props:
 * data: data with array format. Ex: [{id:... , text:...}]
 * isSearchStartText: allow user search like or search from start text
 * searchKeyword: key search on object
 * isServerSearch: server searching or filter local list
 */
type State = {
  selectedItem: Object | null;
  dataFiltered: any[];
  query: string;
  isOpened: boolean;
  labelSelected: string;
  data: Object[];
  measure?: {
    width: number;
    height: number;
    px: number;
    py: number;
  };
  firstGetMeasure: boolean;
};

type Prop = {
  data: Object[];
  isSearchStartText: boolean;
  searchKeyword: string;
  onSelected?: (item: any) => void;
  onRemoveSelected?: () => void;
  isServerSearch: boolean;
  onTextChanged?: (query: string, isLoadMore: boolean) => void;
  loadMore: (query: string, isLoadMore: boolean) => void;
  placeholder?: string;
};
const initialState: State = {
  selectedItem: null,
  dataFiltered: [],
  data: [],
  query: '',
  isOpened: false,
  labelSelected: '',
  firstGetMeasure: false,
};
export class AutoCompleteInput extends React.Component<Prop, State> {
  filteredList: any = []; // list of items
  selectedIdx = -1;
  toHighlight: string = '';
  notFound = false;
  overlay = false;
  view: any;
  isSearching: boolean = false;

  constructor(props: Prop) {
    super(props);
    this.state = {
      ...initialState,
      data: this.props.data,
    };
  }

  getResultFromServer(query: string) {
    this.setState({query: query});
    this.props.onTextChanged && this.props.onTextChanged(query, false);
    this.isSearching = true;
  }

  shouldComponentUpdate(
    nextProps: Readonly<Prop>,
    nextState: Readonly<State>,
    nextContext: any,
  ): boolean {
    if (nextProps.data !== this.state.data && this.props.isServerSearch) {
      this.setState({
        dataFiltered: nextProps.data,
        data: nextProps.data,
      });
      this.isSearching = false;
    }
    return true;
  }

  /**
   * Filter data
   */
  filterList(query: string) {
    this.setState({query: query});
    this.selectedIdx = -1;
    if (query != null && this.props.data) {
      this.toHighlight = query;
      this.filteredList = this.props.data.filter((item: any) => {
        if (typeof item === 'string') {
          // string logic, check equality of strings
          return this.props.isSearchStartText
            ? item
                .toString()
                .toLowerCase()
                .indexOf(query.toString().trim().toLowerCase()) === 0
            : item
                .toString()
                .toLowerCase()
                .indexOf(query.toString().trim().toLowerCase()) > -1;
        } else if (typeof item === 'object' && item.constructor === Object) {
          // object logic, check property equality
          return item[this.props.searchKeyword]
            ? this.props.isSearchStartText
              ? item[this.props.searchKeyword]
                  .toString()
                  .toLowerCase()
                  .indexOf(query.toString().trim().toLowerCase()) === 0
              : item[this.props.searchKeyword]
                  .toString()
                  .toLowerCase()
                  .indexOf(query.toString().trim().toLowerCase()) > -1
            : false;
        }
      });
    } else {
      this.notFound = false;
    }
    this.setState({dataFiltered: this.filteredList});
  }

  onSelectedItem(item: any) {
    this.setState({
      labelSelected: item.value,
      selectedItem: item,
    });
    this.onFocusInput();
    this.props.onSelected && this.props.onSelected(item);
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

  getItem(data: any[], index: number) {
    if (data[0] && typeof data[0] === 'string') {
      return {
        id: index,
        value: data[index],
      };
    }
    return {
      id: data[index].id,
      value: data[index].text,
    };
  }

  getItemCount(data: any[]) {
    return data.length;
  }

  clearSelected() {
    this.setState({
      ...initialState,
    });
    this.props.onSelected && this.props.onSelected(null);
    this.props.onRemoveSelected && this.props.onRemoveSelected();
  }

  loadMoreItem() {
    this.props.loadMore(this.state.query, true);
  }

  renderNotfound() {
    return (
      <View style={styles.listItem}>
        {this.state.query ? (
          <Text style={styles.textItem}>
            {this.isSearching ? 'Searching...' : 'No results found'}
          </Text>
        ) : (
          <Text style={styles.textItem}>Please enter 1 or more characters</Text>
        )}
      </View>
    );
  }

  renderItem(item: any) {
    return (
      <TouchableOpacity
        onPress={this.onSelectedItem.bind(this, item)}
        style={styles.listItem}>
        <Text style={styles.textItem}>{item.value}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {labelSelected, dataFiltered, measure} = this.state;
    return (
      <View
        ref={(ref) => (this.view = ref)}
        style={{flex: 1, flexDirection: 'row', zIndex: 100}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.onFocusInput.bind(this)}
          style={styles.selectedItemContainer}>
          <>
            {labelSelected ? (
              <Text style={styles.textItem}> {this.state.labelSelected} </Text>
            ) : (
              <Text style={[styles.textItem, {opacity: 0.7}]}>
                {this.props.placeholder
                  ? this.props.placeholder
                  : 'Search Value'}
              </Text>
            )}
            {this.state.selectedItem && (
              <Icon
                onPress={this.clearSelected.bind(this)}
                type="MaterialIcons"
                name="clear"
                style={styles.iconClear}
              />
            )}
          </>
        </TouchableOpacity>
        {this.state.isOpened && (
          <Modal transparent visible={true}>
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
                  width: measure?.width || '100%',
                  left: measure?.px || 0,
                },
              ]}>
              <View style={styles.searchBoxContainer}>
                <Input
                  autoFocus={true}
                  onChangeText={(text) =>
                    this.props.isServerSearch
                      ? this.getResultFromServer(text)
                      : this.filterList(text)
                  }
                  style={styles.searchBox}
                />
              </View>
              {dataFiltered.length > 0 && this.state.query ? (
                <View style={styles.listItemContainer}>
                  <VirtualizedList
                    style={{height: 200}}
                    data={dataFiltered}
                    initialNumToRender={4}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item: any) => item.id}
                    getItemCount={this.getItemCount}
                    getItem={this.getItem}
                    onEndReached={() => this.loadMoreItem()}
                    onEndReachedThreshold={0.6}
                  />
                </View>
              ) : (
                this.renderNotfound()
              )}
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedItemContainer: {
    marginBottom: 5,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    flex: 1,
  },
  dropDownContainer: {
    position: 'absolute',
    padding: 10,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.WHITE,
  },
  searchBoxContainer: {
    height: 40,
    justifyContent: 'center',
  },
  searchBox: {
    height: 40,
    paddingLeft: 16,
    borderWidth: 0.5,
    color: Colors.TEXT_TITLE,
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
    color: Colors.TEXT_TITLE,
  },
  iconClear: {
    fontSize: 20,
    position: 'absolute',
    right: 20,
    color: Colors.TEXT_TITLE,
  },
});
