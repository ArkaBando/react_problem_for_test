import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { setUser } from "./rootReducer";

export const Login = (props) => {
  const [form, setForm] = useState({
    name: undefined,
    password: undefined,
  });
  const [msg, setMsg] = useState(undefined);
  const [redirection, setRedirection] = useState(false);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    let frm = form;
    frm[name] = value;

    setForm(frm);
  };

  const reset = () => {
    setRedirection(false);
    setForm({
      name: undefined,
      password: undefined,
    });
    setMsg(undefined);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.name == null || form.name == undefined) {
      setMsg("Invalid user");
      return;
    }

    if (form.password == null || form.password == undefined) {
      setMsg("Invalid password");
      return;
    }

    axios
      .post("http://localhost:3100/login", {
        name: form.name,
        password: form.password,
      })
      .then((resp) => {
        if (resp.status == "200") {
          reset();
          props.setUser(resp.data.body[0]);
          setRedirection(true);
        } else {
          setMsg("Invalid User Credential");
        }
      })
      .catch((error) => {
        setMsg("Invalid User Credential");
      });
  };

  if (redirection) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form
        autoComplete={""}
        style={{ width: "30%", margin: " 150px 750px auto" }}
        method="post"
        onSubmit={onSubmit}
      >
        <h1>Login</h1>
        <div class="container">
          <p style={{ color: "red" }}>{msg}</p>
          <label for="name">
            <b>Username</b>
          </label>
          <input
            defaultValue={form.name}
            type="text"
            placeholder="Enter Username"
            name="name"
            onChange={onChange}
            required
          />

          <label for="password">
            <b>Password</b>
          </label>
          <input
            defaultValue={form.password}
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
            required
          />

          <button type="submit">Login</button>

          <Link to="/signup">SignUp</Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return { setUser: (user) => dispatch(setUser(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
