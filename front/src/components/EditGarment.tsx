import React, { useEffect } from "react";
import { IGarment } from "../interfaceIgarment";
import { IMyUser } from "../reducers/myUserReducer";
import { RouteComponentProps } from "react-router";

interface IPropsGlobal {
    garments: IGarment[];
    token: string;
    myUser: IMyUser;
    editGarment: (garment_id: string, garment: IGarment) => void;
}

const EditGarment: React.FC<IPropsGlobal & RouteComponentProps<{ garment_id: string }>> = props => {
    const [reference, setReference] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [season, setSeason] = React.useState("");
    const [sizes, setSizes] = React.useState("");
    const [colors, setColors] = React.useState("");
    const [users, setUsers] = React.useState("");
    const [images, setImages] = React.useState("");

    const updateReference = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReference(event.currentTarget.value);
    };

    const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value);
    };

    const updateSeason = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeason(event.currentTarget.value);
    };

    const updateSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSizes(event.currentTarget.value);
    };

    const updateColors = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColors(event.currentTarget.value);
    };

    const updateUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsers(event.currentTarget.value);
    };

    const updateImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImages(event.currentTarget.value);
    };

    const garment = props.garments.find(g => g._id === props.match.params.garment_id);

    useEffect(() => {
        
    })
    

    return (
        <div></div>
    )
};

export default EditGarment;