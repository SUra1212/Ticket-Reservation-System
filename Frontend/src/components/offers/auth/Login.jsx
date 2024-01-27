import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  let history = useHistory();

  const [nic, setNiv] = useState("");
  const [password, setPassword] = useState("");

  const validation = (nic, password) => {
    if (nic === "" || password === "") {
      // swal({
      //   title: "Error",
      //   text: "Please fill all the required field!",
      //   icon: "error",
      //   button: "OK",
      // });
      return false;
    }
    return true;
  };

  const loginCustomer = async (e) => {
    if (!validation(nic, password)) {
      return;
    }

    e.preventDefault();

    const res = await fetch("https://localhost:7245/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nic,
        password,
      }),
    });

    if (res.status === 401) {
      swal({
        title: "Warning",
        text: "Invalid Credentials !!",
        icon: "warning",
        button: "OK",
      });
      console.log("Invalid Credentials");
    } else if (res.status === 200) {
      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data?.user));

      swal({
        title: "Success",
        text: "Login Successfully !!",
        icon: "success",
        button: "OK",
      });
      console.log("Login Successfully !!");
      history.push("/dashboard");
    } else {
      swal({
        title: "Error",
        text: "An error occurred while logging in.",
        icon: "error",
        button: "OK",
      });
      console.log("An error occurred while logging in.");
    }
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-4">
          <form method="POST" className="shadow-lg">
            <h1 className="mb-3">Login Page</h1>
            <div className="form-group">
              <label htmlFor="email_field">NIC</label>
              <input
                className="form-control"
                type="text"
                id="nic"
                name="nic"
                value={nic}
                onChange={(e) => setNiv(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Link to="/reset" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="signin"
              name="signin"
              value="Login"
              onClick={loginCustomer}
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
