import {LoadingSpinnerAction, LoadingState} from '../types';
import {SPINNER_ACTION_TYPES} from './actions';

export const initialLoadingState: LoadingState = {
  isShowLoading: false,
};

export const toggleSpinnerReducer = (
  state: LoadingState = initialLoadingState,
  action: LoadingSpinnerAction,
) => {
  const newState: LoadingState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SPINNER_ACTION_TYPES.SHOW_LOADING:
      const {isShow} = <LoadingSpinnerAction>action;
      return {
        ...newState,
        isShowLoading: isShow,
      };
    default:
      return newState;
  }
};
