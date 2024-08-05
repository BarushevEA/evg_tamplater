import {ICallback} from "../../../../../libs/Observables/Types";

export type IMsg = {
    id: string;
    command?: string;
    payload?: any;
    component?: ICallback<any>;
} | undefined;

export enum ID {
    TEST1 = "TEST1",
    TEST2 = "TEST2",
    TEST3 = "TEST3",
}

export enum COMMAND_TEST1 {
    GET_APPLES = "GET_APPLES",
    GET_MEET = "GET_MEET"
}

export enum COMMAND_TEST2 {
    GET_CAR = "GET_CAR",
    GET_BIKE = "GET_BIKE"
}

export enum COMMAND_TEST3 {
    GET_COOKIE = "GET_COOKIE",
    GET_CAKE = "GET_CAKE"
}
