import React, { Fragment } from "react";
import * as actions from "../actions/userActions";
import { IMyUser } from "../reducers/myUserReducer";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShowGarments from "./ShowGarments";
import "./styles/Navbar.css";
// import "./styles/materialize.min.css";
// const materialize = require("react-materialize");
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
    <div className="s-layout__sidebar">
      {/* <label htmlFor="side" className="toggle">☰</label> */}
      <a className="s-sidebar__trigger" href="#0">
        <i className="fa fa-bars" />
      </a>

      <nav className="s-sidebar__nav">
        <ul>
          <li>
            <a className="s-sidebar__nav-link" href="#0">
              <i className="fa fa-home" />
              <em>Home</em>
            </a>
          </li>
          <li>
            <a className="s-sidebar__nav-link" href="#0">
              <i className="fa fa-user" />
              <em>My Profile</em>
            </a>
          </li>
          <li>
            <a className="s-sidebar__nav-link" href="#0">
              <i className="fa fa-camera" />
              <em>Camera</em>
            </a>
          </li>
        </ul>
      </nav>
    </div>
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

    //       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    //        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
    //     </form>
    //   </nav>
    // </div>

    //---------------MATERIALIZE-----------------------//
    // <div className="container-fluid">
    //   <materialize.SideNav
    //     trigger={<materialize.Button>MENU</materialize.Button>}
    //     options={{ closeOnClick: true }}
    //   >
    //     <div className="sidebarr">
    //       <materialize.SideNavItem
    //         userView
    //         user={{
    //           image: "./images/LogoLabtex.png",
    //         }}
    //       />
    //       <materialize.SideNavItem>
    //         <a className="navbar-brand" href="/">
    //           {props.myUser.username}
    //         </a>
    //       </materialize.SideNavItem>

    //       <materialize.SideNavItem className="link-side" options={{ alignment: "left" }}>
    //         <Link
    //           to={"/users/" + props.myUser.id}
    //           className="btn btn-outline-info my-2 my-sm-0 botonSidebar"
    //         >
    //           Profile
    //         </Link>
    //       </materialize.SideNavItem>

    //       <materialize.SideNavItem className="link-side">
    //         <Link
    //           to={"/Home"}
    //           className="btn btn-outline-info my-2 my-sm-0 botonSidebar"
    //         >
    //           Home
    //         </Link>
    //       </materialize.SideNavItem>
    //       <materialize.SideNavItem divider />
    //       <materialize.Dropdown
    //         trigger={<materialize.Button> SEASONS</materialize.Button>}
    //         options={{
    //           alignment: "left",
    //           hover: false,
    //           belowOrigin: true,
    //           constrainWidth: false,
    //           coverTrigger: true
    //         }}
    //       >
    //         <Link to={"/garments/"} className="dropdown-item">
    //           SS'19
    //         </Link>
    //         <Link to={"/garments/"} className="dropdown-item">
    //           AW'20
    //         </Link>
    //         <Link to={"/garments/"} className="dropdown-item">
    //           SS'20
    //         </Link>
    //       </materialize.Dropdown>
    //       <materialize.SideNavItem waves href="#!third">
    //         Third Link With Waves
    //       </materialize.SideNavItem>
    //       <div className="logout">
    //         <div className="botonUser">
    //           <Link
    //             to="/users"
    //             className="btn btn-outline-info my-2 my-sm-0 botonUser1"
    //           >
    //             Users
    //           </Link>
    //         </div>
    //         <div className="botonLogout">
    //           <button
    //             className="btn btn-outline-info my-2 my-sm-0"
    //             type="submit"
    //             onClick={logOut}
    //             data-toggle="collapse"
    //             data-target="#navbarNavDropdown"
    //             aria-controls="navbarNavDropdown"
    //             aria-expanded="false"
    //             aria-label="Toggle navigation"
    //           >
    //             Logout
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </materialize.SideNav>
    // </div>

    //----------------BOOTSTRAP NUEVO SIDE---------------//

    // <div className="page-wrapper chiller-theme toggled">
    //   <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
    //     <i className="fas fa-bars" />
    //   </a>
    //   <nav id="sidebar" className="sidebar-wrapper">
    //     <div className="sidebar-content">
    //       <div className="sidebar-brand">
    //         <a href="#">pro sidebar</a>
    //         <div id="close-sidebar">
    //           <i className="fas fa-times" />
    //         </div>
    //       </div>
    //       <div className="sidebar-header">
    //         <div className="user-pic">
    //           <img
    //             className="img-responsive img-rounded"
    //             src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
    //           />
    //           alt="User picture">
    //         </div>
    //         <div className="user-info">
    //           <span className="user-name">
    //             Jhon
    //             <strong>Smith</strong>
    //           </span>
    //           <span className="user-role">Administrator</span>
    //           <span className="user-status">
    //             <i className="fa fa-circle" />
    //             <span>Online</span>
    //           </span>
    //         </div>
    //       </div>
    //       {/* <!-- sidebar-header  --> */}
    //       <div className="sidebar-search">
    //         <div>
    //           <div className="input-group">
    //             <input
    //               type="text"
    //               className="form-control search-menu"
    //               placeholder="Search..."
    //             />
    //             <div className="input-group-append">
    //               <span className="input-group-text">
    //                 <i className="fa fa-search" aria-hidden="true" />
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* <!-- sidebar-search  --> */}
    //       <div className="sidebar-menu">
    //         <ul>
    //           <li className="header-menu">
    //             <span>General</span>
    //           </li>
    //           <li className="sidebar-dropdown">
    //             <a href="#">
    //               <i className="fa fa-tachometer-alt" />
    //               <span>Dashboard</span>
    //               <span className="badge badge-pill badge-warning">New</span>
    //             </a>
    //             <div className="sidebar-submenu">
    //               <ul>
    //                 <li>
    //                   <a href="#">
    //                     Dashboard 1
    //                     <span className="badge badge-pill badge-success">
    //                       Pro
    //                     </span>
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Dashboard 2</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Dashboard 3</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li className="sidebar-dropdown">
    //             <a href="#">
    //               <i className="fa fa-shopping-cart" />
    //               <span>E-commerce</span>
    //               {/* <span class="badge badge-pill badge-danger">3</span> */}
    //             </a>
    //             <div className="sidebar-submenu">
    //               <ul>
    //                 <li>
    //                   <a href="#">Products</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Orders</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Credit cart</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li className="sidebar-dropdown">
    //             <a href="#">
    //               <i className="far fa-gem" />
    //               <span>Components</span>
    //             </a>
    //             <div className="sidebar-submenu">
    //               <ul>
    //                 <li>
    //                   <a href="#">General</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Panels</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Tables</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Icons</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Forms</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li className="sidebar-dropdown">
    //             <a href="#">
    //               <i className="fa fa-chart-line" />
    //               <span>Charts</span>
    //             </a>
    //             <div className="sidebar-submenu">
    //               <ul>
    //                 <li>
    //                   <a href="#">Pie chart</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Line chart</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Bar chart</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Histogram</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li className="sidebar-dropdown">
    //             <a href="#">
    //               <i className="fa fa-globe" />
    //               <span>Maps</span>
    //             </a>
    //             <div className="sidebar-submenu">
    //               <ul>
    //                 <li>
    //                   <a href="#">Google maps</a>
    //                 </li>
    //                 <li>
    //                   <a href="#">Open street map</a>
    //                 </li>
    //               </ul>
    //             </div>
    //           </li>
    //           <li className="header-menu">
    //             <span>Extra</span>
    //           </li>
    //           <li>
    //             <a href="#">
    //               <i className="fa fa-book" />
    //               <span>Documentation</span>
    //               <span className="badge badge-pill badge-primary">Beta</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#">
    //               <i className="fa fa-calendar" />
    //               <span>Calendar</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#">
    //               <i className="fa fa-folder" />
    //               <span>Examples</span>
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="sidebar-footer">
    //       <a href="#">
    //         <i className="fa fa-bell" />
    //         <span className="badge badge-pill badge-warning notification">
    //           3
    //         </span>
    //       </a>
    //       <a href="#">
    //         <i className="fa fa-envelope" />
    //         <span className="badge badge-pill badge-success notification">
    //           7
    //         </span>
    //       </a>
    //       <a href="#">
    //         <i className="fa fa-cog" />
    //         <span className="badge-sonar" />
    //       </a>
    //       <a href="#">
    //         <i className="fa fa-power-off" />
    //       </a>
    //     </div>
    //   </nav>
    // </div>
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
