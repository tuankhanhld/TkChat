import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import {I18nManager} from "react-native";

const translationGetters = {
	en: require("assets/locales/en/app.json"),
	th: require("assets/locales/th/app.json")
};

I18n.translations = translationGetters;
I18n.fallbacks = false;

const fallback = { languageTag: "en", isRTL: false };

const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

I18nManager.forceRTL(isRTL);
I18n.locale = languageTag;

export default I18n;
