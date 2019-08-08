import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { connect } from "react-redux";
import { IGlobalState } from "./reducers/reducers";
import LayoutPage from "./components/LayoutPage";

interface IPropsGlobal {
  token: string;
}

const App: React.FC<IPropsGlobal> = props => {
  return (
    <BrowserRouter>
      <Switch>
        {!props.token && <Route path="/" exact component={LoginPage} />}
        {props.token && <Route component={LayoutPage} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

export default connect(mapStateToProps)(App);
