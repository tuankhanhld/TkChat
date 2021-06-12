import {
  AuthenAction,
  AuthenErrorAction,
  UserInfoState,
  LoginUserAction,
} from '../types';
import {AUTHENTICATION_ACTION_TYPES} from './actions';

export const initialState: UserInfoState = {
  isSignedIn: false,
  token: '',
  userId: '',
  errCode: 0,
  errMessage: '',
  userProfile: {},
};

export const authenticateUserReducer = (
  state: UserInfoState = initialState,
  action: AuthenAction,
) => {
  const newState: UserInfoState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case AUTHENTICATION_ACTION_TYPES.LOGIN_SUCCESS:
      const {token, userId} = (<LoginUserAction>action).userInfor;
      return {
        ...newState,
        token,
        userId,
        isSignedIn: true,
        userProfile: (<LoginUserAction>action).userInfor,
      };
    case AUTHENTICATION_ACTION_TYPES.LOG_OUT_SUCCESS:
      return {
        ...newState,
        token: '',
        userId: '',
        isSignedIn: false,
      };
    case AUTHENTICATION_ACTION_TYPES.LOGIN_ERROR:
    case AUTHENTICATION_ACTION_TYPES.LOGOUT_ERROR:
      const {errCode, errMessage} = <AuthenErrorAction>action;
      return {
        ...newState,
        errCode,
        errMessage,
      };
    default:
      return newState;
  }
};
