import React, { useEffect } from "react";
import { IUser } from "../interfaceIuser";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link, RouteComponentProps, Redirect } from "react-router-dom";

interface IPropsGlobal {
  token: string;
  users: IUser[];
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
    const id = user_id;
    fetch("http://localhost:3000/api/users/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        props.removeUser(user_id);
        props.history.push("/users/list");
      }
    });
  };

  //   if (!user) {
  //     return <Redirect to="/" />;
  //   }

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center" id="table">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Company Name</th>
                <th scope="col">Country</th>
                <th scope="col">Is Admin</th>
                <th scope="col">Role</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {props.users.map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.surname}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>{u.companyName}</td>
                  <td>{u.country}</td>
                  <td>{u.isAdmin + ""}</td>
                  <td>{u.role.name}</td>
                  <td>
                    <Link to={"/users/edit/" + u._id} className="btn btn-info">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <div className="btn btn-info" onClick={() => Delete(u._id)}>
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/users/add" className="btn btn-info">
            Add New User
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  users: state.users
});

const mapDispatchToProps = {
  setUsers: actions.setUsers,
  removeUser: actions.removeUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowUsers);
