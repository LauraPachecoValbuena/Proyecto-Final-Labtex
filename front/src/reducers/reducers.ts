import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IMyUser, myUserReducer } from "./myUserReducer";
import { IUser } from "../interfaceIuser";
import { usersReducer } from "./usersReducer";
import { IRole } from "../interfaceRole";
import { roleReducer } from "./roleReducer";

export interface IGlobalState {
    token: string;
    myUser: IMyUser;
    users: IUser[];
    roles: IRole[];
}

export const reducers = combineReducers<IGlobalState>({
    token: tokenReducer,
    myUser: myUserReducer,
    users: usersReducer,
    roles: roleReducer
});