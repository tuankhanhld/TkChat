import {Dimensions,PixelRatio} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HIGHT = Dimensions.get('window').height;
// types
type Offset = {
    [key: string]: number
}
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scaleSize = (size: number) => (WINDOW_WIDTH/guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

function dimensions(top: number, right: number = top, bottom: number = top, left: number = right, property: string){
    let styles: any = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

export function margin(top: number, right: number, bottom: number, left: number){
    return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top: number, right: number, bottom: number, left: number){
    return dimensions(top, right, bottom, left, 'padding');
}

export const verticalScale = (size: number) => WINDOW_HIGHT / guidelineBaseHeight * size;
export const moderateScale = (size: number, factor = 0.5) => size + ( scaleSize(size) - size ) * factor;

export function boxShadow(color: string, offset: Offset = {height:2,width:2},
                          radius: number = 8, opacity: number = 0.2){
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}