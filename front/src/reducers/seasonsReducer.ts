import { ISeason } from "../interfaceSeason";
import { TAction } from "../actions/garmentActionsTypes";


const initialState: ISeason[] = [];

export const seasonReducer = (
    state: ISeason[] = initialState,
    action: TAction
): ISeason[] => {
    if (action.type === "SET_SEASONS") {
        return action.seasons;
    }
    return state;
};