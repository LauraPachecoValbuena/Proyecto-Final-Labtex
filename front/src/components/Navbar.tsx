import React, { Fragment } from "react";
import * as actions from "../actions/userActions";
import { IMyUser } from "../reducers/myUserReducer";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShowGarments from "./ShowGarments";
import "./styles/Navbar.css";
import "./styles/materialize.min.css";
const materialize = require("react-materialize");
// import logo from './images/LogoLabtex.png';
// import fondo from '#';

interface IPropsGlobal {
  myUser: IMyUser;
  saveToken: (token: string) => void;
}

const Navbar: React.FC<IPropsGlobal> = props => {
  // const {
  //   SideNav,
  //   SideNavItem,
  //   Button,
  //   Dropdown,
  //   Divider
  // } = require("react-materialize");

  const logOut = () => {
    props.saveToken("");
    localStorage.removeItem("token");
  };

  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <img src="images/LogoLabtex.png" width="70" height="60" />

    //     <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //       <ul className="navbar-nav">
    //         <li className="nav-item active">
    //           <a className="nav-link" href="/">
    //             HOME <span className="sr-only">(current)</span>
    //           </a>
    //         </li>
    //         <li className="nav-item dropdown">
    //           <a
    //             className="nav-link dropdown-toggle"
    //             id="navbarDropdownMenuLink"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             SEASONS
    //           </a>
    //           <div
    //             className="dropdown-menu"
    //             aria-labelledby="navbarDropdownMenuLink"
    //           >
    //             <Link to={"/garments/"} className="dropdown-item">
    //               SS'19
    //             </Link>
    //             <a className="dropdown-item" href="#">
    //               AW'20
    //             </a>
    //             <a className="dropdown-item" href="#">
    //               SS'20
    //             </a>
    //           </div>
    //         </li>
    //       </ul>
    //     </div>

    //     <a className="navbar-brand" href="/">
    //       {props.myUser.username}
    //     </a>
    //     <form className="form-inline">
    //       <button
    //         className="btn btn-outline-info my-2 my-sm-0"
    //         type="submit"
    //         onClick={logOut}
    //         data-toggle="collapse"
    //         data-target="#navbarNavDropdown"
    //         aria-controls="navbarNavDropdown"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         Logout
    //       </button>
    //       <Link to="/users" className="btn btn-outline-info my-2 my-sm-0">
    //         Users
    //       </Link>
    //       <Link
    //         to={"/users/" + props.myUser.id}
    //         className="btn btn-outline-info my-2 my-sm-0"
    //       >
    //         Profile
    //       </Link>
    //     </form>
    //   </nav>
    // </div>

    //---------------MATERIALIZE-----------------------//
    <div className="container-fluid">
      <materialize.SideNav
        trigger={<materialize.Button>MENU</materialize.Button>}
        options={{ closeOnClick: true }}
      >
        <div className="sidebarr">
          <materialize.SideNavItem
            userView
            user={{
              image: "./images/LogoLabtex.png",
            }}
          />
          <materialize.SideNavItem>
            <a className="navbar-brand" href="/">
              {props.myUser.username}
            </a>
          </materialize.SideNavItem>

          <materialize.SideNavItem className="link-side" options={{ alignment: "left" }}>
            <Link
              to={"/users/" + props.myUser.id}
              className="btn btn-outline-info my-2 my-sm-0 botonSidebar"
            >
              Profile
            </Link>
          </materialize.SideNavItem>
          <materialize.SideNavItem className="link-side">
            <Link
              to={"/Home"}
              className="btn btn-outline-info my-2 my-sm-0 botonSidebar"
            >
              Home
            </Link>
          </materialize.SideNavItem>
          <materialize.SideNavItem divider />
          <materialize.Dropdown
            trigger={<materialize.Button> SEASONS</materialize.Button>}
            options={{
              alignment: "left",
              hover: false,
              belowOrigin: true,
              constrainWidth: false,
              coverTrigger: true
            }}
          >
            <Link to={"/garments/"} className="dropdown-item">
              SS'19
            </Link>
            <Link to={"/garments/"} className="dropdown-item">
              AW'20
            </Link>
            <Link to={"/garments/"} className="dropdown-item">
              SS'20
            </Link>
          </materialize.Dropdown>
          <materialize.SideNavItem waves href="#!third">
            Third Link With Waves
          </materialize.SideNavItem>
          <div className="logout">
            <div className="botonUser">
              <Link
                to="/users"
                className="btn btn-outline-info my-2 my-sm-0 botonUser1"
              >
                Users
              </Link>
            </div>
            <div className="botonLogout">
              <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="submit"
                onClick={logOut}
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </materialize.SideNav>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser
});

const mapDispatchToProps = {
  saveToken: actions.saveToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
