import { ActionCreator } from "redux";
import { TAction } from "./actionsTypes";

export const saveToken: ActionCreator<TAction> = (token: string) => ({
    type: "SAVE_TOKEN",
    token
});