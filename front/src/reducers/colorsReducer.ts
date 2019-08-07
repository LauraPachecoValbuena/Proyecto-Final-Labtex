import { IColor } from "../interfaceColor";
import { TAction } from "../actions/garmentActionsTypes";



const initialState: IColor[] = [];

export const colorsReducer = (
    state: IColor[] = initialState,
    action: TAction
): IColor[] => {
    if (action.type === "SET_COLORS") {
        return action.colors;
    }
    return state;
};