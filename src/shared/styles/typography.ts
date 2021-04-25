import {scaleFont} from './mixins';
import {TextStyle} from 'react-native';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans-Regular';
export const FONT_FAMILY_BOLD = 'OpenSans-Bold';
export const FONT_ROBOTO = 'Roboto';
export const AIA_BODY_BOLD = 'AIA-BodyBold';
export const AIA_BODY = 'AIA-Body';
export const AIA_HEADING = 'AIA-Heading';
export const AIA_EVEREST_BETA = 'AIA Everest Beta';
// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR: TextStyle = {
  fontFamily: FONT_ROBOTO,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD: TextStyle = {
  fontFamily: FONT_ROBOTO,
  fontWeight: FONT_WEIGHT_BOLD,
};
