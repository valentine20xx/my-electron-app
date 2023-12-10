import {Model} from "../model/model";

export enum ACTION_TYPES {
    NAME_CHANGED,
    SURNAME_CHANGED
}

export interface StateAction {
    type: ACTION_TYPES;
    payload: any;
}

export interface NameChangedAction extends StateAction {
    type: ACTION_TYPES.NAME_CHANGED;
    payload: string;
}

export interface SurnameChangedAction extends StateAction {
    type: ACTION_TYPES.SURNAME_CHANGED;
    payload: string;
}

export const ctx = "context";

export type StateActions = NameChangedAction | SurnameChangedAction;

export const reducer = (state: Model, action: StateActions) => {
    const {type, payload} = action;
    switch (type) {
        case ACTION_TYPES.NAME_CHANGED: {
            const newState = {...state, name: payload}
            sessionStorage.setItem(ctx, JSON.stringify(newState))
            return newState;
        }
        case ACTION_TYPES.SURNAME_CHANGED: {
            const newState = {...state, surname: payload}
            sessionStorage.setItem(ctx, JSON.stringify(newState))
            return newState;
        }
        default:
            return {...state}
    }
}

export const initializer = (model: Model): Model => {
    sessionStorage.setItem(ctx, JSON.stringify(model))

    return model;
}

export const initializerArg: Model = {name: "", surname: ""}