import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Switch, Route, RouteComponentProps } from "react-router";
import ShowUsers from "./ShowUsers";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { IRole } from "../interfaceRole";
import { IGlobalState } from "../reducers/reducers";
import * as userActions from "../actions/userActions";
import { connect } from "react-redux";
import ShowGarments from "./ShowGarments";
import AddGarment from "./AddGarment";
import { ISize } from "../interfaceSize";
import { IColor } from "../interfaceColor";
import { IUser } from "../interfaceIuser";
import * as garmentActions from "../actions/garmentActions";
import EditGarment from "./EditGarment";
import { ISeason } from "../interfaceSeason";

interface IPropsGlobal {
  token: string;
  roles: IRole[];
  users: IUser[];
  sizes: ISize[];
  colors: IColor[];
  seasons: ISeason[];
  setUsers: (users: IUser[]) => void;
  setRoles: (roles: []) => void;
  setSizes: (sizes: ISize[]) => void;
  setColors: (colors: IColor[]) => void;
  setSeasons: (seasons: ISeason[]) => void;
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

  const getSizes = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/sizes/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(sizes => {
            props.setSizes(sizes);
          });
        }
      });
    }
  };

  const getColors = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/colors/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(colors => {
            props.setColors(colors);
          });
        }
      });
    }
  };

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

  const getSeasons = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/seasons/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(seasons => {
            props.setSeasons(seasons);
          });
        }
      });
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    getSizes();
  }, []);

  useEffect(() => {
    getColors();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getSeasons();
  }, []);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/users/add" exact component={AddUser} />
        <Route path="/users/" exact component={ShowUsers} />
        {/* <Route path="/users/edit/:user_id" exact component={EditUser} /> */}
        <Route path="/users/:user_id" exact component={EditUser} />
        <Route
          path="/seasons/:season_id/garments/add"
          exact
          component={AddGarment}
        />
        <Route
          path="/seasons/:season_id/garments/"
          exact
          component={ShowGarments}
        />
        <Route
          path="/seasons/:season_id/garments/edit/:garment_id"
          exact
          component={EditGarment}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  roles: state.roles,
  sizes: state.sizes,
  colors: state.colors,
  users: state.users,
  seasons: state.seasons
});

const mapDispatchToProps = {
  setRoles: userActions.setRoles,
  setUsers: userActions.setUsers,
  setSizes: garmentActions.setSizes,
  setColors: garmentActions.setColors,
  setSeasons: garmentActions.setSeasons
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutPage);
