import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
// import jwt from "jsonwebtoken";

interface IProps {
  saveToken: (token: string) => void;
}

const Login: React.FC<IProps> = props => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const getToken = () => {
    fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => {
      if (res.ok) {
        res.text().then(token => {
          localStorage.setItem("token", token);
          props.saveToken(token);
        });
      }
    });
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="form-group" id="login">
          <h3>Login</h3>
          <br />
          <h4>Email</h4>
          <input
            type="text"
            id="username"
            placeholder=""
            className="form-control"
            value={email}
            onChange={updateEmail}
          />
          <br />
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            placeholder=""
            className="form-control"
            value={password}
            onChange={updatePassword}
          />
          <br />
          <button
            type="submit"
            className="btn btn-outline-info"
            onClick={getToken}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

const mapDispatchToProps = {
    saveToken: actions.saveToken
};

export default connect(
    null,
    mapDispatchToProps
)(Login);
