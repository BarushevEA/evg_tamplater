import {TYPE} from "../../settings/subRoutesEnums";
import {ButtonImageState, ButtonState} from "./enums";

export type ButtonComponent = {
    name: string;
    text: string;
    textElement: HTMLElement;
    image: string;
    imageElement: HTMLImageElement;
};

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
    id?: string;
    actionCallback: () => void;
    type: T;
    customOptions?: T extends TYPE.BUTTON ? ButtonTypeOptions : ImageTypeOptions;
    state: ButtonState | ButtonImageState;
    text?: string; // Text может быть опциональным для иконок
};

export type ButtonBaseStateStyles = {
    generalStyle: BaseOptions;
    [key: string]: ButtonTypeOptions;
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

export type ImageStateStyles = {
    generalStyle: BaseOptions;
    [ButtonImageState.DEFAULT]: ButtonTypeOptions;
    [ButtonImageState.CUSTOM]: ButtonTypeOptions;
};

