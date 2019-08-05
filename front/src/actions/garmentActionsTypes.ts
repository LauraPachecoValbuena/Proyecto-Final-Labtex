import { IGarment } from '../interfaceIgarment';

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

export type TAction =
    | TSetGarmentsAction
    | TRemoveGarmentAction
    | TEditGarmentAction;