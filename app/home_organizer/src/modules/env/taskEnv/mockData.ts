import {ITask} from "./types";
import {E_TASK_TYPE} from "./enums";
import {getDefaultId} from "./utils";
import {LOCATION} from "../../../../../../libs/elements/AppLocalization/location";

export const MOCK_TASKS: ITask[] = [
    {
        type: E_TASK_TYPE.FOOD,
        name: {
            [LOCATION.EN]: "Bread",
            [LOCATION.RU]: "RU Bread",
            [LOCATION.UA]: "UA Bread",
        },
        comment: {
            [LOCATION.EN]: "Don't eat it for dinner",
            [LOCATION.RU]: "RU Don't eat it for dinner",
            [LOCATION.UA]: "UA Don't eat it for dinner",
        },
        description: {
            [LOCATION.EN]: "White Ukrainian bread",
            [LOCATION.RU]: "RU White Ukrainian bread",
            [LOCATION.UA]: "UA White Ukrainian bread",
        },
        isFavorite: true,
        isFail: false,
        isSelected: true,
        id: getDefaultId(),
        count: 3,
        price: 10,
        cost: 0,
        startDate: 0,
        endDate: 0,
    },
    {
        type: E_TASK_TYPE.FOOD,
        name: {
            [LOCATION.EN]: "Apple",
            [LOCATION.RU]: "RU Apple",
            [LOCATION.UA]: "UA Apple",
        },
        comment: {
            [LOCATION.EN]: "Very useful",
            [LOCATION.RU]: "RU Very useful",
            [LOCATION.UA]: "UA Very useful",
        },
        description: {
            [LOCATION.EN]: "Red apple",
            [LOCATION.RU]: "RU Red apple",
            [LOCATION.UA]: "UA Red apple",
        },
        isFavorite: true,
        isFail: false,
        isSelected: false,
        id: getDefaultId(),
        count: 1,
        price: 15,
        cost: 15,
        startDate: 0,
        endDate: 0,
    },
    {
        type: E_TASK_TYPE.FOOD,
        name: {
            [LOCATION.EN]: "Cupcake",
            [LOCATION.RU]: "RU Cupcake",
            [LOCATION.UA]: "UA Cupcake",
        },
        comment: {
            [LOCATION.EN]: "Very sweet",
            [LOCATION.RU]: "RU Very sweet",
            [LOCATION.UA]: "UA Very sweet",
        },
        description: {
            [LOCATION.EN]: "Cupcake with chocolate",
            [LOCATION.RU]: "RU Cupcake with chocolate",
            [LOCATION.UA]: "UA Cupcake with chocolate",
        },
        isFavorite: false,
        isFail: false,
        isSelected: true,
        id: getDefaultId(),
        count: 1,
        price: 40,
        cost: 40,
        startDate: 0,
        endDate: 0,
    },
    {
        type: E_TASK_TYPE.GOODS,
        name: {
            [LOCATION.EN]: "Knife",
            [LOCATION.RU]: "RU Knife",
            [LOCATION.UA]: "UA Knife",
        },
        comment: {
            [LOCATION.EN]: "Dangerous",
            [LOCATION.RU]: "RU Dangerous",
            [LOCATION.UA]: "UA Dangerous",
        },
        description: {
            [LOCATION.EN]: "Iron knife",
            [LOCATION.RU]: "RU Iron knife",
            [LOCATION.UA]: "UA Iron knife",
        },
        isFavorite: false,
        isFail: false,
        isSelected: false,
        id: getDefaultId(),
        count: 1,
        price: 100,
        cost: 100,
        startDate: 0,
        endDate: 0,
    },
    {
        type: E_TASK_TYPE.GOODS,
        name: {
            [LOCATION.EN]: "Table",
            [LOCATION.RU]: "RU Table",
            [LOCATION.UA]: "UA Table",
        },
        comment: {
            [LOCATION.EN]: "New desktop",
            [LOCATION.RU]: "RU New desktop",
            [LOCATION.UA]: "UA New desktop",
        },
        description: {
            [LOCATION.EN]: "Brown table",
            [LOCATION.RU]: "RU Brown table",
            [LOCATION.UA]: "UA Brown table",
        },
        isFavorite: false,
        isFail: false,
        isSelected: true,
        id: getDefaultId(),
        count: 1,
        price: 1000,
        cost: 1000,
        startDate: 0,
        endDate: 0,
    }
];
