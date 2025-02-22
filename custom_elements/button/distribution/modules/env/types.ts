import {TYPE} from "../../settings/subRoutesEnums";
import {ButtonState} from "./enums";

export type ImageBaseOptions = {
    style?: Partial<CSSStyleDeclaration>;
    altText?: string;
    src?: string;
};

export type BaseOptions = {
    containerStyle?: Partial<CSSStyleDeclaration>;
    textBlockStyle?: Partial<CSSStyleDeclaration>;
    imageStyle?: ImageBaseOptions;
};

export type ButtonTypeOptions = BaseOptions & {};

export type ImageTypeOptions = BaseOptions & {};

export type ButtonOptions<T extends TYPE> = {
    actionCallback: () => void;
    type: T;
    typeOptionsBeforeClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    typeOptionsAfterClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    typeOptionsOnClick?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    state: ButtonState;
    text?: string; // Text может быть опциональным для иконок
};

export type ButtonStateStyles = {
    generalStyle: BaseOptions;
    [ButtonState.DEFAULT]: ButtonTypeOptions;
    [ButtonState.CLOSE]: ButtonTypeOptions;
    [ButtonState.MINIMIZE]: ButtonTypeOptions;
    [ButtonState.MAXIMIZE]: ButtonTypeOptions;
    [ButtonState.DANGER]: ButtonTypeOptions;
    [ButtonState.SUCCESS]: ButtonTypeOptions;
    [ButtonState.INFO]: ButtonTypeOptions;
    [ButtonState.WARNING]: ButtonTypeOptions;
    [ButtonState.LINK]: ButtonTypeOptions;
    [ButtonState.CUSTOM]: ButtonTypeOptions;
};

