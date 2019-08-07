import { ActionCreator } from "redux";
import { IGarment } from '../interfaceIgarment';
import { TAction } from "./garmentActionsTypes";
import { ISize } from "../interfaceSize";
import { IColor } from "../interfaceColor";

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

export const addNewGarment: ActionCreator<TAction> = (garment: IGarment) => ({
    type: "ADD_NEW_GARMENT",
    garment
});

export const setSizes: ActionCreator<TAction> = (sizes: ISize[]) => ({
    type: "SET_SIZES",
    sizes
});

export const setColors: ActionCreator<TAction> = (colors: IColor[]) => ({
    type: "SET_COLORS",
    colors
});