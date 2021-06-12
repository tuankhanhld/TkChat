import {
  AuthenErrorAction,
  LoginUserAction,
  LogOutUserAction,
  UserLoginInfor,
} from '../types';

export enum AUTHENTICATION_ACTION_TYPES {
  SEND_LOGIN = 'SEND_LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  SEND_LOG_OUT = 'SEND_LOG_OUT',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT_ERROR = 'LOG_OUT_ERROR',
}

export const loginUser = (userInfor: UserLoginInfor): LoginUserAction => ({
  type: AUTHENTICATION_ACTION_TYPES.SEND_LOGIN,
  userInfor: userInfor,
});

export const loginSuccess = (userInfor: UserLoginInfor): LoginUserAction => ({
  type: AUTHENTICATION_ACTION_TYPES.LOGIN_SUCCESS,
  userInfor: userInfor,
});

export const logoutUser = (): LogOutUserAction => ({
  type: AUTHENTICATION_ACTION_TYPES.SEND_LOG_OUT,
});

export const loginUserErr = (
  statusCode: number,
  message: string,
): AuthenErrorAction => ({
  type: AUTHENTICATION_ACTION_TYPES.LOGIN_ERROR,
  errCode: statusCode,
  errMessage: message,
});

export const logoutUserErr = (
  statusCode: number,
  message: string,
): AuthenErrorAction => ({
  type: AUTHENTICATION_ACTION_TYPES.LOGOUT_ERROR,
  errCode: statusCode,
  errMessage: message,
});
