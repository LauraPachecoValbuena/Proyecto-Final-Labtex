import { ActionCreator } from "redux";
import { IGarment } from '../interfaceIgarment';
import { TAction } from "./garmentActionsTypes";

export const setGarments: ActionCreator<TAction> = (garments: IGarment[]) => ({
    type: "SET_GARMENTS",
    garments
});