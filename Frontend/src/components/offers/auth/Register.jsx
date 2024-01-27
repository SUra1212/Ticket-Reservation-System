import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Register = () => {
  let history = useHistory();
  const [nic, setNic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  function sendDetails(e) {
    e.preventDefault();

    const newCustomer = {
      nic,
      firstName,
      lastName,
      email,
      password,
      gender,
      role,
    };

    console.log(newCustomer);

    axios
      .post("https://localhost:7245/api/User", newCustomer)
      .then(() => {
        swal({
          title: "Success",
          text: "Registration Successful!!",
          icon: "success",
          button: "OK",
        });

        console.log("Registration Successful");
        history.push("/");
      })
      .catch((err) => {
        swal({
          title: "Warning",
          text: "Invalid Registration!!",
          icon: "warning",
          button: "OK",
        });

        console.log("Invalid Registration");
      });
  }

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-4">
          <form
            action=""
            onSubmit={sendDetails}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="form-control"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter First Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Last Name</label>
              <input
                type="text"
                id="lname"
                className="form-control"
                name="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Enter Last Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="cemail"
                className="form-control"
                name="cemail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nic_field">NIC</label>
              <input
                type="text"
                id="nic"
                name="nic"
                className="form-control"
                onChange={(e) => {
                  setNic(e.target.value);
                }}
                placeholder="Enter NIC"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender_field">Gender</label>
              <select
                id="gender_field"
                className="form-control"
                name="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={gender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role</label>
              <select
                id="role_field"
                className="form-control"
                name="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
                required
              >
                <option>select</option>
                <option value="BackOffice">Back Office</option>
                <option value="TravelAgent">Travel Agent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="cpassword"
                className="form-control"
                name="cpassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
                required
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
