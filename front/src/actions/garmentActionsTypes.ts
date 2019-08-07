import { IGarment } from '../interfaceIgarment';
import { ISize } from '../interfaceSize';
import { IColor } from '../interfaceColor';

type TSetGarmentsAction = {
    type: "SET_GARMENTS";
    garments: IGarment[];
};

type TRemoveGarmentAction = {
    type: "REMOVE_GARMENT";
    garment_id: string;
}

type TEditGarmentAction = {
    type: "EDIT_GARMENT";
    garment_id: string;
    garment: IGarment;
}

type TAddNewGarmentAction = {
    type: "ADD_NEW_GARMENT";
    garment: IGarment;
}

type TSetSizesAction = {
    type: "SET_SIZES";
    sizes: ISize[];
}

type TSetColorsAction = {
    type: "SET_COLORS";
    colors: IColor[];
}

export type TAction =
    | TSetGarmentsAction
    | TRemoveGarmentAction
    | TEditGarmentAction
    | TAddNewGarmentAction
    | TSetSizesAction
    | TSetColorsAction;