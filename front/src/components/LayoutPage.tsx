import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Switch, Route, RouteComponentProps } from "react-router";
import ShowUsers from "./ShowUsers";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { IRole } from "../interfaceRole";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions/userActions";
import { connect } from "react-redux";
import ShowGarments from "./ShowGarments";

interface IPropsGlobal {
  token: string;
  roles: IRole[];
  setRoles: (roles: []) => void;
}

const LayoutPage: React.FC<IPropsGlobal & RouteComponentProps> = props => {

  const getRoles = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/roles/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(roles => {
            props.setRoles(roles);
          });
        }
      });
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/users/add" exact component={AddUser} />
        <Route path="/users/list" exact component={ShowUsers} />
        <Route path="/users/edit/:user_id" exact component={EditUser} />
        <Route path="/garments/list" exact component={ShowGarments} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  roles: state.roles
});

const mapDispatchToProps = {
  setRoles: actions.setRoles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutPage);
