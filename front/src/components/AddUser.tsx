import React from "react";
import { IUser } from "../interfaceIuser";
import { IMyUser } from "../reducers/myUserReducer";
import { RouteComponentProps } from "react-router";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/userActions";
import { connect } from "react-redux";
import { IRole } from "../interfaceRole";
import ShowUsers from "./ShowUsers";
import { Link } from "react-router-dom";
import "./styles/AddUser.css";
import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IPropsGlobal {
  roles: IRole[];
  user: IUser[];
  token: string;
  myUser: IMyUser;
  addNewUser: (user: IUser) => void;
}

const AddUser: React.FC<IPropsGlobal & RouteComponentProps<{}>> = props => {
  const [username, setUsername] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState<number>(0);
  const [companyName, setCompanyName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [role, setRole] = React.useState("");

  const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const updateSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.currentTarget.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const updateMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(event.currentTarget.valueAsNumber);
  };

  const updateCompanyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.currentTarget.value);
  };

  const updateCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.currentTarget.value);
  };

  const updateIsAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.currentTarget.checked);
  };

  const updateRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.currentTarget.value);
  };

  const Add = () => {
    fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        username: username,
        surname: surname,
        email: email,
        password: password,
        mobile: mobile,
        companyName: companyName,
        country: country,
        isAdmin: isAdmin,
        role: role
      })
    }).then(response => {
      if (response.ok) {
        response.json().then((user: IUser) => {
          props.addNewUser(user);
          props.history.push("/users/");
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center" id="rowAddUser">
        <div className="col-6">
          <div className="form-group" id="formEdit">
            <h3>Personal Details</h3>
            <br />
            <h4>Username</h4>
            <input
              type="text"
              id="username"
              placeholder=""
              className="form-control"
              onChange={updateUsername}
            />
            <br />
            <h4>Surname</h4>
            <input
              type="text"
              id="surname"
              placeholder=""
              className="form-control"
              onChange={updateSurname}
            />
            <br />
            <h4>Email</h4>
            <input
              type="text"
              id="email"
              placeholder=""
              className="form-control"
              onChange={updateEmail}
            />
            <br />
            <h4>Password</h4>
            <input
              type="password"
              id="password"
              placeholder=""
              className="form-control"
              onChange={updatePassword}
            />
            <br />
            <h4>Mobile</h4>
            <input
              type="number"
              id="mobile"
              placeholder=""
              className="form-control"
              onChange={updateMobile}
            />
            <br />
            <h4>Company Name</h4>
            <input
              type="text"
              id="companyName"
              placeholder=""
              className="form-control"
              onChange={updateCompanyName}
            />
            <br />
            <h4>Country</h4>
            <input
              type="text"
              id="country"
              placeholder=""
              className="form-control"
              onChange={updateCountry}
            />
            <br />
            <h4>Role:</h4>
            <select onChange={updateRole} className="select">
              {props.roles.map(r => (
                <option value={r._id}>{r.name}</option>
              ))}
            </select>
            <br />
            <br/>
            <div className=" form-group form-check">
              <h4>Administrator</h4>
              <input
                type="checkbox"
                className="form-control"
                onChange={updateIsAdmin}
              />
              <br />
            </div>
            <div className="botones">
            <button
              type="submit"
              className="btn btn-outline-info my-2 my-sm-0 btnSaveUser"
              onClick={Add}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            <Link to={"/users/"}
              className="btn btn-outline-info my-2 my-sm-0 btnCancelUser"
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
  roles: state.roles
});

const mapDispatchToProps = {
  addNewUser: actions.addNewUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
