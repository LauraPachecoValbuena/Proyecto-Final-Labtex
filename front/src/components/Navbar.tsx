import React, { Fragment } from "react";
import * as actions from "../actions/userActions";
import { IMyUser } from "../reducers/myUserReducer";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShowGarments from "./ShowGarments";
import "./styles/Navbar.css";
import { ISeason } from "../interfaceSeason";
// import "./styles/materialize.min.css";
// const materialize = require("react-materialize");
// import logo from './images/LogoLabtex.png';
// import fondo from '#';

interface IPropsGlobal {
  myUser: IMyUser;
  saveToken: (token: string) => void;
  seasons: ISeason[];
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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="images/LogoLabtex.png" width="70" height="60" />

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"}>
                HOME {/*<span className="sr-only">(current)</span>*/}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                SEASONS
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {props.seasons.map(s => (
                  <Link
                    to={"/seasons/" + s._id + "/garments/"}
					className="dropdown-item"
					key={s._id}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>

        <a className="navbar-brand" href="/">
          {props.myUser.username}
        </a>
        <form className="form-inline">
          <Link
            to={"/users/" + props.myUser.id}
            className="btn btn-outline-info my-2 my-sm-0"
          >
            Profile
          </Link>

          <Link to="/users" className="btn btn-outline-info my-2 my-sm-0">
            Users
          </Link>

          {/* <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> */}
          <Link to="/search" className="btn btn-outline-info my-2 my-sm-0">
            Search
          </Link>

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
        </form>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser,
  seasons: state.seasons
});

const mapDispatchToProps = {
  saveToken: actions.saveToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

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
