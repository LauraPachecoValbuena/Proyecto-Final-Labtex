import React, { Fragment } from 'react';
import * as actions from '../actions/userActions';
import { IMyUser } from '../reducers/myUserReducer';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowGarments from './ShowGarments';
import './styles/Navbar.css';
import { ISeason } from '../interfaceSeason';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCoffee,
	faSignOutAlt,
	faUsers,
	faUserCircle,
	faSearch,
	faPowerOff,
	faHome,
	faChevronCircleDown,
	faBars
} from '@fortawesome/free-solid-svg-icons';
// import "./styles/materialize.min.css";
// const materialize = require("react-materialize");
// import logo from './images/LogoLabtex.png';
// import fondo from '#';

interface IPropsGlobal {
	myUser: IMyUser;
	saveToken: (token: string) => void;
	seasons: ISeason[];
}

const Navbar: React.FC<IPropsGlobal> = (props) => {
	const logOut = () => {
		props.saveToken('');
		localStorage.removeItem('token');
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light">
				<a className="navbar-brand" href="/">
					<img src="images/LogoLabtex.png" width="90" height="58" className="LogoNavbar" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to={'/'} className="nav-link">
								HOME
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
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								{props.seasons.map((s) => (
									<Link to={'/seasons/' + s._id + '/garments/'} className="dropdown-item" key={s._id}>
										{s.name}
									</Link>
								))}
							</div>
						</li>
					</ul>
				</div>

				<form className="form-inline">
					<div>
						<a className="navbar-text">
							<strong className="usernameLayout">{props.myUser.username}</strong>
						</a>
					</div>
				
					<div>
					<Link to={'/users/' + props.myUser.id} className="btn btn-outline-info my-2 my-sm-0">
						<FontAwesomeIcon icon={faUserCircle} />
					</Link>

					<Link to="/users" className="btn btn-outline-info my-2 my-sm-0">
						<FontAwesomeIcon icon={faUsers} />
					</Link>

					<Link to="/search" className="btn btn-outline-info my-2 my-sm-0">
						<FontAwesomeIcon icon={faSearch} />
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
						<FontAwesomeIcon icon={faPowerOff} />
					</button>
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//----------------------SIDEBAR-----------------------------------//

{
	/* <div className="nav-side-menu">
<div className="brand">
  <img src="images/LogoLabtex.png" width="70" height="60"  />
</div>
 <FontAwesomeIcon icon={faBars}   className="fa fa-bars fa-2x toggle-btn"
  data-toggle="collapse"
  data-target="#menu-content" />

<div className="menu-list">
  <a className="navbar-brand" href="/">
    {props.myUser.username}
  </a>
  <form className="form-inline">
    <Link
      to={"/users/" + props.myUser.id}
      className="btn btn-outline-info my-2 my-sm-0"
    >
      <FontAwesomeIcon icon={faUserCircle} />
    </Link>

    <Link to="/users" className="btn btn-outline-info my-2 my-sm-0">
      <FontAwesomeIcon icon={faUsers} />
    </Link>
    <br/>


    <Link to="/search" className="btn btn-outline-info my-2 my-sm-0">
      <FontAwesomeIcon icon={faSearch} />
    </Link> */
}

{
	/* <button
      className="btn btn-outline-info my-2 my-sm-0"
      type="submit"
      onClick={logOut}
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <FontAwesomeIcon icon={faPowerOff} />
    </button> */
}
// </form>

// <ul id="menu-content" className="menu-content collapse out">
//   <li>
//     <Link to={"/"}>
//       <FontAwesomeIcon icon={faHome} /> HOME
//     </Link>
//   </li>

//   <li
//     data-toggle="collapse"
//     data-target="#service"
//     className="collapsed"
//   >
//     <a >
//       SEASONS <FontAwesomeIcon icon={faChevronCircleDown} />
//     </a>
//   </li>
//   <ul className="sub-menu collapse" id="service">
//     {props.seasons.map(s => (
//       <Link
//         to={"/seasons/" + s._id + "/garments/"}
//         className="dropdown-item"
//         key={s._id}
//       >
//         {s.name}
//       </Link>
//     ))}
//   </ul>
//   <form className="form">
{
	/* <Link to="/search" className="btn btn-outline-info my-2 my-sm-0">
      <FontAwesomeIcon icon={faSearch} />
    </Link>
    <br/> */
}

//     <button
//       className="btn btn-outline-info my-2 my-sm-0"
//       type="submit"
//       onClick={logOut}
//       data-toggle="collapse"
//       data-target="#navbarNavDropdown"
//       aria-controls="navbarNavDropdown"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <FontAwesomeIcon icon={faPowerOff} />
//     </button>
//   </form>
//   </ul>
// </div>
// </div>
