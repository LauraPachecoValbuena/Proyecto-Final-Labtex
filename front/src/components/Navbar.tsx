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
import { faUsers, faUserCircle, faSearch, faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
		<div className="container-fluid">
			<nav className="navbar fixed-top navbar-expand-lg navbar-light">
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

				<form className="form" id="formNavbar">
					<div className="">
						<a className="navbar-text">
							<strong className="usernameLayout">{props.myUser.username}</strong>
						</a>
					</div>

					<div className="botonesNavbar">
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
