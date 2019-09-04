import React, { useEffect } from "react";
import { IGarment } from "../interfaceIgarment";
import { IMyUser } from "../reducers/myUserReducer";
import { RouteComponentProps } from "react-router";
import { IUser } from "../interfaceIuser";
import { IRole } from "../interfaceRole";
import { ISize } from "../interfaceSize";
import { IColor } from "../interfaceColor";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/garmentActions";
import { connect } from "react-redux";
import { ISeason } from "../interfaceSeason";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import "./styles/EditGarment.css";

interface IPropsGlobal {
  sizes: ISize[];
  colors: IColor[];
  roles: IRole[];
  users: IUser[];
  garments: IGarment[];
  token: string;
  myUser: IMyUser;
  seasons: ISeason[];
  editGarment: (garment_id: string, garment: IGarment) => void;
}

const EditGarment: React.FC<
  IPropsGlobal & RouteComponentProps<{ garment_id: string; season_id: string }>
> = props => {
  const [reference, setReference] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<string[]>([]);
  const [images, setImages] = React.useState();
  const [error, setError] = React.useState("");

  const updateReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReference(event.currentTarget.value);
    setError("");
  };

  const updateDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value);
  };

  const updateSizes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setSizes(selectedOptions);
  };

  const updateColors = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setColors(selectedOptions);
  };

  const updateUsers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setUsers(selectedOptions);
  };

  const updateImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.currentTarget.files![0]);
  };

  const garment = props.garments.find(
    g => g._id === props.match.params.garment_id
  );

  useEffect(() => {
    if (garment) {
      setReference(garment.reference);
      if (garment.description) setDescription(garment.description);
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
    const formData = new FormData();
    formData.append("file", images);
    formData.append("id", garment_id);

    fetch("http://localhost:3000/api/garments/edit/" + garment_id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        reference: reference,
        description: description,
        season: props.match.params.season_id,
        sizes: sizes,
        colors: colors,
        users: users
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(g => {
          props.editGarment(garment_id, g);
          props.history.push(
            "/seasons/" + props.match.params.season_id + "/garments/"
          );
        });
      }
    });

    fetch("http://localhost:3000/api/garments/addImage", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token
      },
      body: formData
    }).then(response => {
      if (response.ok) {
        response.json().then(() => {
          props.history.push(
            "/seasons/" + props.match.params.season_id + "/garments/"
          );
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center" id="rowEditGarment">
        <div className="col-6">
          <div className="form-group" id="formEdit">
            <h3>Garment's Details</h3>
            <br />
            <h4>Reference</h4>
            <input
              type="text"
              id="reference"
              placeholder=""
              className="form-control"
              value={reference}
              onChange={updateReference}
            />
            <br />
            <h4>Description</h4>
            <textarea
              id="exampleFormControlTextarea1"
              className="form-control"
              value={description}
              onChange={updateDescription}
            />
            <br />
            <h4>Season</h4>
            <input
              disabled
              type="text"
              id="season"
              className="form-control"
              value={props.seasons.find(s => s._id === garment.season)!.name}
            />
            <br />
            <div className="row">
              <div className="col-sm-12 col-lg-4">
                <h4>Colors:</h4>
                <select
                  value={colors}
                  onChange={updateColors}
                  multiple
                  className="selectMultiple"
                >
                  {props.colors.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />

              <div className="col-sm-12 col-lg-4">
                <h4>Sizes:</h4>
                <select
                  value={sizes}
                  onChange={updateSizes}
                  multiple
                  className="selectMultiple"
                >
                  {props.sizes.map(s => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />

              <div className="col-sm-12 col-lg-4">
                <h4>Users:</h4>
                <select
                  value={users}
                  onChange={updateUsers}
                  multiple
                  className="selectMultiple"
                >
                  {props.users.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <h4>Images</h4>
            <input
              type="file"
              className="btn btn-info btnImage"
              onChange={updateImages}
            />
            <br />
            <br />
            <div className="botones">
              <button
                type="submit"
                className="btn btn-outline-info my-2 my-sm-0 btnSaveGarment"
                onClick={() => Edit(garment._id)}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>

              <Link
                to={"/seasons/" + props.match.params.season_id + "/garments/"}
                className="btn btn-outline-info my-2 my-sm-0 btnCancelGarment"
              >
                <FontAwesomeIcon icon={faWindowClose} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  token: state.token,
  myUser: state.myUser,
  roles: state.roles,
  sizes: state.sizes,
  colors: state.colors,
  garments: state.garments,
  seasons: state.seasons
});

const mapDispatchToProps = {
  editGarment: actions.editGarment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGarment);
