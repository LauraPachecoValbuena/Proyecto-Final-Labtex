import { IMyUser } from "../reducers/myUserReducer";
import { IUser } from "../interfaceIuser";
import { IRole } from "../interfaceRole";

type TSaveTokenAction = {
    type: "SAVE_TOKEN";
    token: string;
};

type TSaveMyUserAction = {
    type: "SAVE_MY_USER";
    myUser: IMyUser;
};

type TSetUsersAction = {
    type: "SET_USERS";
    users: IUser[];
};

type TRemoveUserAction = {
    type: "REMOVE_USER";
    user_id: string;
};

type TEditUserAction = {
    type: "EDIT_USER";
    user_id: string;
    user: IUser;
}

type TAddNewUserAction = {
    type: "ADD_NEW_USER";
    user: IUser;
};

type TSetRolesAction = {
    type: "SET_ROLES";
    roles: IRole[];
}

export type TAction =
    | TSaveTokenAction
    | TSaveMyUserAction
    | TSetUsersAction
    | TRemoveUserAction
    | TEditUserAction
    | TAddNewUserAction
    | TSetRolesAction;