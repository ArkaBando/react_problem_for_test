import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { setCartCount, setNOTIF } from "./rootReducer.js";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App(props) {
  const [cartCount, setCartCount] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [msg, setMsg] = useState(undefined);
  const [products, setProducts] = useState([
    "product1",
    "product2",
    "product3",
  ]);

  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user == undefined || user == null || user == "undefined") {
      setRedirect(true);
    } else {
      setCartCount(props.notificationCount);
      if (props.notificationCount > 0) {
        setMsg("Notifying message" + props.notificationCount);
      }
      setRedirect(false);
    }
    // if (cCount && cCount != null && parseInt(cCount) > 0) {
    //   setCartCount(cCount);
    // }
  }, []);

  useEffect(() => {
    if (props.notificationCount != cartCount) {
      setCartCount(props.notificationCount);
    }
  }, [props.notificationCount]);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  const notifyMessage = (e) => {
    axios
      .post("http://localhost:3100/addNotification", {
        email: props.user.email,
        notificationCount: cartCount + 1,
      })
      .then((resp) => {
        setMsg("Notifying message" + parseInt(parseInt(cartCount) + 1));
        props.setNOTIF(parseInt(cartCount));
        setCartCount(parseInt(cartCount) + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <header>
        Notification
        <p>{msg}</p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("user", undefined);
            props.setNOTIF(cartCount);
            setRedirect(true);
          }}
        >
          Logout
        </button>
      </header>
      <article>
        <button type="button" onClick={notifyMessage}>
          Send Notification
        </button>
      </article>
      <footer></footer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCartCount: (count) => dispatch(setCartCount(count)),
    setNOTIF: (count) => dispatch(setNOTIF(count)),
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    cartCount: state.cartCount,
    notificationCount: state.notificationCount,
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
