import { TAction } from "../actions/userActionsTypes";


export interface IMyUser {
    token?: string;
    email?: string;
    exp?: number;
    iat?: number;
    id?: string;
    isAdmin?: boolean;
    username?: string;
    role?: string;
}

const initialState: IMyUser = {};

export const myUserReducer = (
    state: IMyUser = initialState,
    action: TAction
): IMyUser => {
    if (action.type === "SAVE_MY_USER") {
        return action.myUser;
    }
    return state;
};