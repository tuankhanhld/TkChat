export type AppState = {
  userInfo: UserInfoState;
};

// types for user authentication

export type UserLoginInfor = {
  token: string;
  userId: string;
  userProfile: any;
};
export type UserInfoState = {
  isSignedIn: boolean;
  token: string;
  userId: string;
  errCode: number;
  errMessage: string;
  userProfile: any;
};

export type LoginUserAction = {
  type: string;
  userInfor: UserLoginInfor;
};

export type LogOutUserAction = {
  type: string;
};

export type AuthenErrorAction = {
  type: string;
  errCode: number;
  errMessage: string;
};

export type AuthenAction =
  | LoginUserAction
  | LogOutUserAction
  | AuthenErrorAction;
