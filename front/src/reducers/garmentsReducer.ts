import { IGarment } from "../interfaceIgarment";
import { TAction } from "../actions/garmentActionsTypes";


const initialState: IGarment[] = [];

export const garmentsReducer = (
    state: IGarment[] = initialState,
    action: TAction
): IGarment[] => {
    if (action.type === "SET_GARMENTS") {
        return action.garments;
    }

    if (action.type === "REMOVE_GARMENT") {
        const garments = state;
        const index = state.findIndex(g => g._id === action.garment_id);
        garments.splice(index, 1);
        return [...garments];
    }

    if (action.type === "EDIT_GARMENT") {
        const garments = state;
        const index = garments.findIndex(g => g._id === action.garment_id);
        if (index !== -1){
            garments[index] = action.garment
        }
        return [...garments]
    }
    return state;
};