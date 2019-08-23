import React, { useEffect } from "react";
import { IUser } from "../interfaceIuser";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/userActions";
import { connect } from "react-redux";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";
import { IMyUser } from "../reducers/myUserReducer";
import "./styles/ShowUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faAddressCard, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import 'bootstrap/dist/css/bootstrap.css';

interface IPropsGlobal {
  token: string;
  users: IUser[];
  myUser: IMyUser;
  setUsers: (users: []) => void;
  removeUser: (user_id: string) => void;
}

const ShowUsers: React.FC<
  IPropsGlobal & RouteComponentProps<{ user_id: string }>
> = props => {
  const user = props.users.find(u => u._id === props.match.params.user_id);
  

  const getUsers = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/users/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(users => {
            props.setUsers(users);
          });
        }
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const Delete = (user_id: string) => {
    fetch("http://localhost:3000/api/users/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        props.removeUser(user_id);
        props.history.push("/users");
      }
    });
  };

  //   if (!user) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <>
      <div className="container">
        <div
          className="row "
          id="table"
        >
          <div className="table-responsive">
          <table className="table table-bordered table-hover ">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Company Name</th>
                <th scope="col">Country</th>
                {props.myUser.isAdmin && <th scope="col">Is Admin</th>}
                {props.myUser.isAdmin && <th scope="col">Role</th>}
                <th />
                {props.myUser.isAdmin && <th />}
              </tr>
            </thead>
            <tbody>
              {props.users.sort((a,b)=> {
                let nameA = a.username.toLowerCase();
                let nameB = b.username.toLowerCase();
              
                if (nameA < nameB){
                  return -1;
                }
                if (nameA > nameB){
                  return 1;
                }
                return 0;
              }).map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.surname}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>{u.companyName}</td>
                  <td>{u.country}</td>
                  {props.myUser.isAdmin && <td className="text-center"> {u.isAdmin ? <img src="/images/CkeckedOk.png" width='20' alt=""/> : <img src="/images/notCheked.png" width='20' alt=""/>}</td>}
                  {props.myUser.isAdmin && <td>{u.role.name}</td>}
                  <td>
                    <Link
                      to={"/users/" + u._id}
                      className="btn my-2 my-sm-0 btnshowUsers"
                    >
                      <FontAwesomeIcon icon={faAddressCard} />
                    </Link>
                  </td>

                  {props.myUser.isAdmin && (
                    <td>
                      <div
                        className="btn my-2 my-sm-0 btnshowUsers"
                        onClick={() => Delete(u._id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="col-11">
          {props.myUser.isAdmin && (
            <Link to="/users/add" className="btn btn-info my-2 my-sm-0 btnaddUsers">
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  users: state.users,
  myUser: state.myUser
});

const mapDispatchToProps = {
  setUsers: actions.setUsers,
  removeUser: actions.removeUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowUsers);
