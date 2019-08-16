import React, { useEffect } from "react";
import { IUser } from "../interfaceIuser";
import { IMyUser } from "../reducers/myUserReducer";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/userActions";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";

interface IPropsGlobal {
  users: IUser[];
  token: string;
  myUser: IMyUser;
  editUser: (user_id: string, user: IUser) => void;
}

const EditUser: React.FC<
  IPropsGlobal & RouteComponentProps<{ user_id: string }>
> = props => {
  const [username, setUsername] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState<number>(0);
  const [companyName, setCompanyName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [error, setError] = React.useState("");
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const updateEditMode = () => {
    setEditMode(e => !e);
  };

  const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
    setError("");
  };

  const updateSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.currentTarget.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setError("");
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

  const user = props.users.find(u => u._id === props.match.params.user_id);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      if (user.surname) setSurname(user.surname);
      if (user.mobile) setMobile(user.mobile);
      if (user.companyName) setCompanyName(user.companyName);
      if (user.country) setCountry(user.country);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const Edit = (user_id: string) => {
    if (username && email) {
      fetch("http://localhost:3000/api/users/edit/" + user._id, {
        method: "PUT",
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
          isAdmin: isAdmin
        })
      }).then(response => {
        if (response.ok) {
          response.json().then(u => {
            props.editUser(user_id, u);
            props.history.push("/users/");
          });
        }
      });
    } else {
      setError("Username or email will be empty");
    }
  };

  const ICanSee =
    props.myUser.isAdmin || props.myUser.id === props.match.params.user_id;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="form-group" id="formEdit">
            <h3>Personal Details</h3>
            <br />
            <div>
              <h4>Username</h4>
              {editMode && (
                <input
                  type="text"
                  id="username"
                  placeholder=""
                  className="form-control"
                  value={username}
                  onChange={updateUsername}
                />
              )}
              {!editMode && <span>{username}</span>}
              <br />
            </div>
            <div>
              <h4>Surname</h4>
              {editMode && (
                <input
                  type="text"
                  id="surname"
                  placeholder=""
                  className="form-control"
                  value={surname}
                  onChange={updateSurname}
                />
              )}
              {!editMode && <span>{surname}</span>}
              <br />
            </div>
            <div>
              <h4>Email</h4>
              {editMode && (
                <input
                  type="text"
                  id="email"
                  placeholder=""
                  className="form-control"
                  value={email}
                  onChange={updateEmail}
                />
              )}
              {!editMode && <span>{email}</span>}
              <br />
            </div>
            {ICanSee && editMode && (
              <div>
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
              </div>
            )}
            {ICanSee && (
              <div>
                <h4>Mobile</h4>
                {editMode && (
                  <input
                    type="number"
                    id="mobile"
                    placeholder=""
                    className="form-control"
                    value={mobile}
                    onChange={updateMobile}
                  />
                )}
                {!editMode && <span>{mobile}</span>}
                <br />
              </div>
            )}
            <div>
              <h4>Company Name</h4>
              {editMode && (
                <input
                  type="text"
                  id="companyName"
                  placeholder=""
                  className="form-control"
                  value={companyName}
                  onChange={updateCompanyName}
                />
              )}
              {!editMode && <span>{companyName}</span>}
              <br />
            </div>
            <div>
              <h4>Country</h4>
              {editMode && (
                <input
                  type="text"
                  id="country"
                  placeholder=""
                  className="form-control"
                  value={country}
                  onChange={updateCountry}
                />
              )}
              {!editMode && <span>{country}</span>}
              <br />
            </div>
            {props.myUser.isAdmin && (
              <div className="form-group">
                <h4>Administrator</h4>
                {editMode && (
                  <input
                    type="checkbox"
                    className="form-control"
                    checked={isAdmin}
                    onChange={updateIsAdmin}
                  />
                )}
                {!editMode && <span>{isAdmin + ""}</span>}
                <br />
              </div>
            )}

            {editMode && (
              <>
                <button
                  className="btn btn-outline-info my-2 my-sm-0"
                  onClick={() => Edit(user._id)}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                
                <button
                  className="btn btn-outline-info my-2 my-sm-0"
                  onClick={updateEditMode}
                >
                  Cancel
                  <FontAwesomeIcon icon={faWindowClose} />
                </button>
              </>
            )}
            
            {ICanSee && (
              <div>
                {!editMode && (
                  <button
                    className="btn btn-outline-info my-2 my-sm-0"
                    onClick={updateEditMode}
                  >
                     <FontAwesomeIcon icon={faUserEdit} />
                  </button>
                )}
              </div>
            )}
            {error && <div className="div">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  token: state.token,
  myUser: state.myUser
});

const mapDispatchToProps = {
  editUser: actions.editUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
