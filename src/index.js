import React from "react";
import ReactDOM from "react-dom";

import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import "./index.css";
import App from "./App";
import Home from "./home";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(createLogger())
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
