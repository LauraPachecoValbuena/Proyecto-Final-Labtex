import React, { useEffect } from 'react';
import { IGarment } from '../interfaceIgarment';
import { RouteComponentProps } from 'react-router';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/garmentActions';
import { garmentsReducer } from '../reducers/garmentsReducer';
import { Link } from 'react-router-dom';
import { IRole } from '../interfaceRole';
import { IUser } from '../interfaceIuser';
import { userInfo } from 'os';
import { usersReducer } from '../reducers/usersReducer';
// import 'bootstrap/dist/css/bootstrap.css';
import { IMyUser } from '../reducers/myUserReducer';
import { ISeason } from '../interfaceSeason';
import './styles/ShowGarments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface IPropsGlobal {
	token: string;
	myUser: IMyUser;
	roles: IRole[];
	users: IUser[];
	garments: IGarment[];
	seasons: ISeason[];
	setGarments: (garments: []) => void;
	removeGarment: (garment_id: string) => void;
}

const ShowGarments: React.FC<IPropsGlobal & RouteComponentProps<{ season_id: string }>> = (props) => {
	const getGarments = () => {
		if (props.token) {
			fetch('http://localhost:3000/api/garments/list', {
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + props.token
				}
			}).then((response) => {
				if (response.ok) {
					response.json().then((garments) => {
						props.setGarments(garments);
					});
				}
			});
		}
	};

	useEffect(
		() => {
			getGarments();
		},
		[ props.garments.length ]
	);

	const Delete = (garment_id: string) => {
		const id = garment_id;
		fetch('http://localhost:3000/api/garments/' + garment_id, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + props.token
			}
		}).then((response) => {
			if (response.ok) {
				props.removeGarment(garment_id);
				props.history.push('/seasons/' + props.match.params.season_id + '/garments/');
			}
		});
	};

	return (
		<div className="container">
			<div className="row">
				{props.garments.filter((g) => g.season === props.match.params.season_id).map((g) => (
					// <div key={g._id} className="col-sm-4">
					<div key={g._id} className="col-sm-3 card border-light mb-3 btn-outline-info">
						{g.images && (
							<img
								src={'http://localhost:3000/uploads/' + g.images[0]}
								className="card-img-top"
								alt="Prendas"
							/>
						)}
						<div className="card-body">
							<h3 className="card-title">{g.reference}</h3>
							<p className="card-text">{g.description}</p>
							<div className="GarmentsButtons">
								<Link
									to={'/seasons/' + props.match.params.season_id + '/garments/edit/' + g._id}
									className="btn my-2 my-sm-0 btnEditGarment"
								>
									{' '}
									<FontAwesomeIcon icon={faEdit} />
								</Link>
								{(props.myUser.role === '5d3ebb9c17fb7b60d454b0a8' ||
									props.myUser.role === '5d3ebc4b17fb7b60d454b0f2') && (
									<div className="btn my-2 my-sm-0 btnDeleteGarment" onClick={() => Delete(g._id)}>
										<FontAwesomeIcon icon={faTrashAlt} />
									</div>
								)}
							</div>
						</div>
					</div>
					/* </div> */
				))}
				{(props.myUser.role === '5d3ebb9c17fb7b60d454b0a8' ||
					props.myUser.role === '5d3ebc4b17fb7b60d454b0f2') && (
					<div className="container">
						<div className="row">
							<div className="col-12">
								<Link
									to={'/seasons/' + props.match.params.season_id + '/garments/add'}
									className="btn btn-info my-2 my-sm-0 btnaddGarments"
								>
									<FontAwesomeIcon icon={faPlusCircle} />
									<br />
									New
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: IGlobalState) => ({
	token: state.token,
	roles: state.roles,
	garments: state.garments,
	myUser: state.myUser,
	users: state.users,
	seasons: state.seasons
});

const mapDispatchToProps = {
	setGarments: actions.setGarments,
	removeGarment: actions.removeGarment
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGarments);
