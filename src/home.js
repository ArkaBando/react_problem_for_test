import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import SignUp from "./signup";
import Login from "./login";

const browserHistory = createBrowserHistory();
const home = (props) => {
  return (
    <Router history={browserHistory}>
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default home;
