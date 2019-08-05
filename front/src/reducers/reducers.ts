import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IMyUser, myUserReducer } from "./myUserReducer";
import { IUser } from "../interfaceIuser";
import { usersReducer } from "./usersReducer";
import { IRole } from "../interfaceRole";
import { roleReducer } from "./roleReducer";
import { IGarment } from "../interfaceIgarment";
import { garmentsReducer } from "./garmentsReducer";

export interface IGlobalState {
    token: string;
    myUser: IMyUser;
    users: IUser[];
    roles: IRole[];
    garments: IGarment[];
}

export const reducers = combineReducers<IGlobalState>({
    token: tokenReducer,
    myUser: myUserReducer,
    users: usersReducer,
    roles: roleReducer,
    garments: garmentsReducer
});