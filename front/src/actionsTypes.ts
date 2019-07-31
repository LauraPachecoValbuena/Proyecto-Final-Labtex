
type TSaveTokenAction = {
    type: "SAVE_TOKEN";
    token: string;
}

export type TAction =
    | TSaveTokenAction;