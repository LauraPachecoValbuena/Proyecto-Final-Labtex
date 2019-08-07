import { ISize } from "../interfaceSize";
import { TAction } from "../actions/garmentActionsTypes";



const initialState: ISize[] = [];

export const sizesReducer = (
    state: ISize[] = initialState,
    action: TAction
): ISize[] => {
    if (action.type === "SET_SIZES") {
        return action.sizes;
    }
    return state;
};