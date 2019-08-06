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

const EditGarment: React.FC<
  IPropsGlobal & RouteComponentProps<{ garment_id: string }>
> = props => {
  const [reference, setReference] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [season, setSeason] = React.useState("");
  const [sizes, setSizes] = React.useState("");
  const [colors, setColors] = React.useState("");
  const [users, setUsers] = React.useState("");
  const [images, setImages] = React.useState("");
  const [error, setError] = React.useState("");

  const updateReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReference(event.currentTarget.value);
    setError("");
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

  const updateColors = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColors(event.currentTarget.value);
  };

  const updateUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsers(event.currentTarget.value);
  };

  const updateImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.currentTarget.value);
  };

  const garment = props.garments.find(
    g => g._id === props.match.params.garment_id
  );

  useEffect(() => {
    if (garment) {
      setReference(garment.reference);
      if (garment.description) setDescription(garment.description);
      if (garment.season) setSeason(garment.season);
      if (garment.sizes) setSizes(garment.sizes);
      if (garment.colors) setColors(garment.colors);
      if (garment.users) setUsers(garment.users);
      if (garment.images) setImages(garment.images);
    }
  }, [garment]);

  if (!garment) {
    return null;
  }

  const Edit = (garment_id: string) => {
    fetch("http://localhost:3000/api/garments/edit/" + garment_id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        reference: reference,
        description: description,
        season: season,
        sizes: sizes,
        colors: colors,
        users: users,
        images: images
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(g => {
          props.editGarment(garment_id, g);
          props.history.push("/garments/list");
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group" id="formEdit">
            <h3>Garment Details</h3>
            <br />
            <h4>Username</h4>
            <input
              type="text"
              id="username"
              placeholder=""
              className="form-control"
              value={username}
              onChange={updateUsername}
            />
            <br />
           
             
                <h4>Colors</h4>
            <select onChange={updateColors}>
              {garment.colors.map(c => (
                <option value={c._id}>{c.name}</option>
              ))}
            </select>
            <br />

            <h4>Email</h4>
            <input
              type="text"
              id="email"
              placeholder=""
              className="form-control"
              value={email}
              onChange={updateEmail}
            />
            <br />
            <h4>Password</h4>
            <input
              type="password"
              id="password"
              placeholder=""
              className="form-control"
              value={password}
              onChange={updatePassword}
            />
            <br />
            <h4>Mobile</h4>
            <input
              type="number"
              id="mobile"
              placeholder=""
              className="form-control"
              value={mobile}
              onChange={updateMobile}
            />
            <br />
            <h4>Company Name</h4>
            <input
              type="text"
              id="companyName"
              placeholder=""
              className="form-control"
              value={companyName}
              onChange={updateCompanyName}
            />
            <br />
            <h4>Country</h4>
            <input
              type="text"
              id="country"
              placeholder=""
              className="form-control"
              value={country}
              onChange={updateCountry}
            />
            <br />
            {/* {props.myUser.isAdmin && ( */}
            <div className=" form-group form-check">
              <h4>Administrador</h4>
              <input
                type="checkbox"
                className="form-control"
                checked={isAdmin}
                onChange={updateIsAdmin}
              />
              <br />
            </div>
            {/* )} */}
            <button
              type="submit"
              className="btn btn-outline-info"
              onClick={() => Edit(user._id)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGarment;
