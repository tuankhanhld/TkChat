import {Observable} from 'rxjs';
import {AuthenAction, UserLoginInfor} from '../types';
import {filter, mapTo} from 'rxjs/operators';
import {AUTHENTICATION_ACTION_TYPES, loginSuccess} from './actions';

export const loginEpic = (action$: Observable<AuthenAction>) =>
  action$.pipe(
    filter((action) => action.type === AUTHENTICATION_ACTION_TYPES.SEND_LOGIN),
    mapTo((value: UserLoginInfor) => {
      loginSuccess(value);
    }),
  );
