import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IMyUser, myUserReducer } from "./myUserReducer";

export interface IGlobalState {
    token: string;
    myUser: IMyUser;
}

export const reducers = combineReducers<IGlobalState>({
    token: tokenReducer,
    myUser: myUserReducer
});