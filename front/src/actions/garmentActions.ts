import { ActionCreator } from "redux";
import { IGarment } from '../interfaceIgarment';
import { TAction } from "./garmentActionsTypes";

export const setGarments: ActionCreator<TAction> = (garments: IGarment[]) => ({
    type: "SET_GARMENTS",
    garments
});

export const removeGarment: ActionCreator<TAction> = (garment_id: string) => ({
    type: "REMOVE_GARMENT",
    garment_id
});

export const editGarment: ActionCreator<TAction> = (garment_id: string, garment: IGarment) => ({
    type: "EDIT_GARMENT",
    garment_id,
    garment
});