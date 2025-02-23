import {ICustomHeaderStyles} from "../env/headerStyles";

export const defaultStyles = <ICustomHeaderStyles>{
    widthHeader: 100,
    heightHeader: 100,
    HeaderColor: "rgb(200,200,200)",

    iconWidth: 80,
    iconHeight: 80,
    iconBorderRadius: 10,

    buttonHeight: 40,
    buttonFontSize: 1.2,

    logoFontFamily: `Tahoma, serif`,
    logoFontWeight: `bold`,
    logoFontColor: `rgb(50,50,50)`,
    logoFontSize: 1.5,
    logoIcon: 'assets/images/logo.png',
    logoText: 'LogoText',

    themeIcon: 'assets/images/theme.png',
    localization: ['EN', 'RU'],
}