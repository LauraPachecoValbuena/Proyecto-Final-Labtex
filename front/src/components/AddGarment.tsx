import React from "react";
import { IGarment } from "../interfaceIgarment";
import { RouteComponentProps } from "react-router";
import { IMyUser } from "../reducers/myUserReducer";
import { IColor } from "../interfaceColor";
import { ISize } from "../interfaceSize";
import { IRole } from "../interfaceRole";
import { IUser } from "../interfaceIuser";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/garmentActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ISeason } from "../interfaceSeason";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import "./styles/AddGarment.css";

interface IPropsGlobal {
  roles: IRole[];
  users: IUser[];
  sizes: ISize[];
  colors: IColor[];
  token: string;
  myUser: IMyUser;
  seasons: ISeason[];
  addNewGarment: (garment: IGarment) => void;
}

const AddGarment: React.FC<
  IPropsGlobal & RouteComponentProps<{ season_id: string }>
> = props => {
  const [reference, setReference] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<string[]>([]);
  const [image, setImage] = React.useState();

  const updateReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReference(event.currentTarget.value);
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

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.currentTarget.files![0]);
  };

  const Add = () => {
    fetch("http://localhost:3000/api/garments/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        response.json().then((garment: IGarment) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("id", garment._id);
          fetch("http://localhost:3000/api/garments/addImage", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + props.token
            },
            body: formData
          }).then(response => {
            if (response.ok) {
              response.json().then(() => {
                props.addNewGarment(garment);
                props.history.push(
                  "/seasons/" + props.match.params.season_id + "/garments/"
                );
              });
            }
          });
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
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
              onChange={updateReference}
            />
            <br />
            <h4>Description</h4>
            <textarea
              id="exampleFormControlTextarea1"
              className="form-control"
              onChange={updateDescription}
            />
            <br />
            <h4>Season</h4>
            <input
              disabled
              type="text"
              id="season"
              className="form-control"
              value={
                props.seasons.find(s => s._id === props.match.params.season_id)!
                  .name
              }
            />
            <br />

            <h4>Colors:</h4>
            <select onChange={updateColors} multiple>
              {props.colors.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <br />
            <br/>

            <h4>Sizes:</h4>
            <select onChange={updateSizes} multiple>
              {props.sizes.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <br />
            <br/>

            <h4>Users:</h4>
            <select onChange={updateUsers} multiple>
              {props.users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.username}
                </option>
              ))}
            </select>
            <br />
            <br/>

            <h4>Images:</h4>
            <input
              type="file"
              className="btn btn-info"
              onChange={updateImage}
            />
            <br />
            <br/>
            <div className="botones">
            <Link
              to={"/seasons/" + props.match.params.season_id + "/garments/"}
              className="btn btn-outline-info my-2 my-sm-0 btnSaveGarment"
              id="add"
              onClick={Add}
            >
              <FontAwesomeIcon icon={faSave} />
            </Link>

            <Link
              to={"/seasons/" + props.match.params.season_id + "/garments/"}
              className="btn btn-outline-info my-2 my-sm-0 btnCancelGarment"
              id="cancel"
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
  seasons: state.seasons
});

const mapDispatchToProps = {
  addNewGarment: actions.addNewGarment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGarment);
