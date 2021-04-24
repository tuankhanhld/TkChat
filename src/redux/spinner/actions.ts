import {LoadingSpinnerAction} from '../types';

export enum SPINNER_ACTION_TYPES {
  SHOW_LOADING = 'SHOW_LOADING',
}

export const toggleSpinnerAction = (
  loading: boolean,
): LoadingSpinnerAction => ({
  type: SPINNER_ACTION_TYPES.SHOW_LOADING,
  isShow: loading,
});
