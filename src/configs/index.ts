import Config from "react-native-config";

export const API_BASE_URL = Config.API_BASE_URL;
export const BASE_ROUTE_URL = Config.BASE_ROUTE_URL;
export const config = {
    baseUrl: API_BASE_URL,
    baseRouteRouteUrl: BASE_ROUTE_URL,
    isProduction: Config.IS_PRODUCTION === 'true',
    dateFormat: 'DD/MM/YYYY',
    dateFormatShown: 'DD MMM YYYY',
    Constants: {

    }
}