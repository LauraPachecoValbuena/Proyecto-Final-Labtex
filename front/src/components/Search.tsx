import React from 'react';
import { IGarment } from '../interfaceIgarment';
import { IUser } from '../interfaceIuser';
import { RouteComponentProps } from 'react-router';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as useractions from '../actions/userActions';
import * as garmentactions from '../actions/garmentActions';
import { Link } from 'react-router-dom';
import { IMyUser } from '../reducers/myUserReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import './styles/Search.css';

interface IPropsGlobal {
	token: string;
	myUser: IMyUser;
	garments: IGarment[];
	users: IUser[];
	removeGarment: (garment_id: string) => void;
	setUsers: (users: IUser[]) => void;
	setGarments: (garments: IGarment[]) => void;
}

const Search: React.FC<IPropsGlobal & RouteComponentProps<{ season_id: string }>> = (props) => {
	const [ searchInput, setSearchInput ] = React.useState<string>('');

	const search = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.currentTarget.value);
	};

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
			<div className="row" id="searchRow">
				<div className="col-12">
					<h4>Search:</h4>
					<input type="text" className="form-control" value={searchInput} onChange={search} />
					<br />
					{searchInput.length > 0 &&
						props.garments.filter((g) => g.reference.startsWith(searchInput)).map((g) => (
							<div key={g._id} className="col-sm-3 card border-light mb-3 btn-outline-info">
								{g.images && (
									<img
										src={'http://localhost:3000/uploads/' + g.images[0]}
										className="card-img-top"
										alt="Prendas"
									/>
								)}
								<div className="card-body">
									<div>
									<h3 className="card-title">{g.reference}</h3>
									<p className="card-text">{g.description}</p>
									</div>
									<div className="card-buttons">
										<Link
											to={'/seasons/' + props.match.params.season_id + '/garments/edit/' + g._id}
											className="btn my-2 my-sm-0 btnEditGarment"
										>
											{' '}
											<FontAwesomeIcon icon={faEdit} />
										</Link>
										{(props.myUser.role === '5d3ebb9c17fb7b60d454b0a8' ||
											props.myUser.role === '5d3ebc4b17fb7b60d454b0f2') && (
											<div
												className="btn my-2 my-sm-0 btnDeleteGarment"
												onClick={() => Delete(g._id)}
											>
												<FontAwesomeIcon icon={faTrashAlt} />
											</div>
										)}
									</div>
								</div>
							</div>
						))}
				</div>

				<div className="col-12 ">
					{searchInput.length > 0 &&
					props.users.filter((u) => u.username.toLowerCase().startsWith(searchInput.toLowerCase())).length >
						0 && (
						<div className="row table-responsive-sm justify-content-center" id="table">
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
									{searchInput.length > 0 &&
										props.users
											.filter((u) =>
												u.username.toLowerCase().startsWith(searchInput.toLowerCase())
											)
											.map((u) => (
												<tr key={u._id}>
													<td>{u.username}</td>
													<td>{u.surname}</td>
													<td>{u.email}</td>
													<td>{u.mobile}</td>
													<td>{u.companyName}</td>
													<td>{u.country}</td>
													{props.myUser.isAdmin && (
														<td className="text-center">
															{' '}
															{u.isAdmin ? (
																<img src="/images/CkeckedOk.png" width="20" alt="" />
															) : (
																<img src="/images/notCheked.png" width="20" alt="" />
															)}
														</td>
													)}
													{props.myUser.isAdmin && <td>{u.role.name}</td>}
													<td>
														<Link
															to={'/users/' + u._id}
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
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IGlobalState) => ({
	token: state.token,
	myUser: state.myUser,
	garments: state.garments,
	users: state.users
});

const mapDispachToProps = {
	setUsers: useractions.setUsers,
	setGarments: garmentactions.setGarments,
	removeGarment: garmentactions.removeGarment
};

export default connect(mapStateToProps, mapDispachToProps)(Search);
