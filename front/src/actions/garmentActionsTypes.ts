import { IGarment } from '../interfaceIgarment';

type TSetGarmentsAction = {
    type: "SET_GARMENTS";
    garments: IGarment[];
};

export type TAction =
    | TSetGarmentsAction;