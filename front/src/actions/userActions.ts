import { ActionCreator } from "redux";
import { TAction } from "./userActionsTypes";
import { IMyUser } from "../reducers/myUserReducer";
import { IUser } from "../interfaceIuser";
import { IRole } from "../interfaceRole";

export const saveToken: ActionCreator<TAction> = (token: string) => ({
    type: "SAVE_TOKEN",
    token
});

export const saveMyUser: ActionCreator<TAction> = (myUser: IMyUser) => ({
    type: "SAVE_MY_USER",
    myUser
});

export const setUsers: ActionCreator<TAction> = (users: IUser[]) => ({
    type: "SET_USERS",
    users
});

export const removeUser: ActionCreator<TAction> = (user_id: string) => ({
    type: "REMOVE_USER",
    user_id
});

export const editUser: ActionCreator<TAction> = (user_id: string, user: IUser) => ({
    type: "EDIT_USER",
    user_id,
    user
});

export const addNewUser: ActionCreator<TAction> = (user: IUser) => ({
    type: "ADD_NEW_USER",
    user
});

export const setRoles: ActionCreator<TAction> = (roles: IRole[]) => ({
    type: "SET_ROLES",
    roles
});