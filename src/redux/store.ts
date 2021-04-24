import {AppState} from './types';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {authenticateUserReducer} from './user/reducers';
import {loginEpic} from './user/epics';

const rootEpic = combineEpics<any>(loginEpic);
const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers<AppState>({
  userInfo: authenticateUserReducer,
});

export let store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
