import React, { useEffect } from "react";
import { IGarment } from "../interfaceIgarment";
import { RouteComponentProps } from "react-router";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions/garmentActions";
import { garmentsReducer } from "../reducers/garmentsReducer";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  token: string;
  garments: IGarment[];
  setGarments: (garments: []) => void;
  removeGarments: (garment_id: string) => void;
}

const ShowGarments: React.FC<
  IPropsGlobal & RouteComponentProps<{ garment_id: string }>
> = props => {
  const garment = props.garments.find(
    g => g._id === props.match.params.garment_id
  );

  const getGarments = () => {
    if (props.token) {
      fetch("http://localhost:3000/api/garments/list", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(garments => {
            props.setGarments(garments);
          });
        }
      });
    }
  };

  useEffect(() => {
    getGarments();
  }, []);

  const Delete = (garment_id: string) => {
    fetch("http://localhost:3000/api/garments" + garment_id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(response => {
      if (response.ok) {
        props.removeGarments(garment_id);
        props.history.push("/garments/list");
      }
    });
  };
  return (
    <div className="container">
      <div className="row">
        {props.garments.map(g => (
          <div key={g._id} className="col-4 border-secondary mb-3">
            <div className="card">
              <img src="/images/Bomberg.png" className="card-img-top" alt="Bomberg" />
              <div className="card-body">
                <h5 className="card-title">{g.reference}</h5>
                <p className="card-text">{g.description}</p>
                <Link to={"/garments/edit/" + g._id} className="btn btn-info">
                  Edit
                </Link>

                <div className="btn btn-info" onClick={() => Delete(g._id)}>
                    Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  garments: state.garments
});

const mapDispatchToProps = {
  setGarments: actions.setGarments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGarments);
