import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export const Signup = (props) => {
  const [form, setForm] = useState({
    email: undefined,
    password: undefined,
    repassword: undefined,
    name: undefined,
    errorMessage: undefined,
  });

  const [redirection, setRedirection] = useState(false);
  const [msg, setMsg] = useState(undefined);
  const [isAgree, setIsAgree] = useState(false);

  const reset = () => {
    setForm({
      email: undefined,
      password: undefined,
      repassword: undefined,
      name: undefined,
      errorMessage: undefined,
    });
    setMsg(undefined);
  };

  useEffect(() => {
    reset();
    setRedirection(false);
  }, []);

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    let frm = form;
    frm[name] = value;

    setForm(frm);
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(password);
  }

  function validateName(username) {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(isAgree);

    if (isAgree) {
      if (form.name && !validateName(form.name)) {
        form.errorMessage = "Invalid User Name";
        setForm(form);
        setMsg(form.errorMessage);
        return;
      }

      if (form.email && !validateEmail(form.email)) {
        form.errorMessage = "Invalid Email Address";
        setForm(form);
        setMsg(form.errorMessage);
        return;
      }

      if (form.password && !validatePassword(form.password)) {
        form.errorMessage =
          "Invalid Password (i.e must be of 8 char length atleast , should be alphanumeric and must contain atleast 1 special char)";
        setForm(form);
        setMsg(form.errorMessage);
        return;
      }

      if (form.password != form.repassword) {
        form.errorMessage = "Password and Repeated Password does not match";
        setForm(form);
        setMsg(form.errorMessage);
        return;
      }
      let user = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      axios
        .post("http://localhost:3100/signup", user)
        .then((resp) => {
          form.errorMessage = undefined;
          setForm(form);
          setMsg(form.errorMessage);
          reset();
          console.log(resp);
          setRedirection(true);
        })
        .catch((err) => {
          form.errorMessage =
            "Either Duplicate email or Due to Network Error Submission cannot be processed";
          setForm(form);
          setMsg(form.errorMessage);
          setRedirection(false);
        });
    } else {
      form.errorMessage = "Please agree to T&C before submitting the form";
      setMsg(form.errorMessage);
      setForm(form);
      return;
    }
  };

  if (redirection) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <form
        style={{
          width: "30%",
          margin: " 150px 750px auto",
          border: "1px solid #ccc",
        }}
        method="post"
        onSubmit={onSubmit}
      >
        <div className="container">
          <h1>Sign Up</h1>
          <p style={{ color: "red" }}>{msg}</p>

          <label htmlFor="name">
            <b>Name</b>
          </label>
          <input
            defaultValue={form.name}
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            onChange={onChange}
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            defaultValue={form.email}
            placeholder="Enter Email"
            name="email"
            required
            onChange={onChange}
          />

          <label htmlFor="psw">
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

          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repassword"
            onChange={onChange}
            defaultValue={form.repassword}
            required
          />

          <p>
            <input
              type="checkbox"
              name="remember"
              onChange={(e) => {
                setIsAgree(e.target.checked);
              }}
              defaultChecked={isAgree}
              style={{ marginBottom: 15 }}
            />{" "}
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "dodgerblue" }}>
              Terms & Privacy
            </a>
            .
          </p>

          <div className="clearfix">
            <Link to="/login">Login</Link>

            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
