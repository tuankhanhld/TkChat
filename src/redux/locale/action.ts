import {ChangeLanguageAction} from '../types';

export enum LOCALE_ACTION_TYPES {
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
}

export const changeLanguageAction = (lang: string): ChangeLanguageAction => ({
  type: LOCALE_ACTION_TYPES.CHANGE_LANGUAGE,
  language: lang,
});
