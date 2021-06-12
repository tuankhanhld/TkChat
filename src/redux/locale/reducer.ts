import {ChangeLanguageAction, LocalizedState} from '../types';
import {LanguageTagEnum} from '../../core/enums/languageTag.enum';
import {LOCALE_ACTION_TYPES} from './action';
import {setRequestLang} from '../../core/interceptors/axios.interceptor';

const initialState: LocalizedState = {
  activeLanguage: LanguageTagEnum.EN,
};

export const changeLanguageReducer = (
  state: LocalizedState = initialState,
  action: ChangeLanguageAction,
) => {
  const newState: LocalizedState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case LOCALE_ACTION_TYPES.CHANGE_LANGUAGE:
      const langCode =
        (<ChangeLanguageAction>action).language === 'en' ? 'en-US' : 'th-TH';
      setRequestLang(langCode);
      return {
        ...newState,
        activeLanguage: (<ChangeLanguageAction>action).language,
      };
    default:
      return newState;
  }
};
