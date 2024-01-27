import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UserProfile = () => {
  let history = useHistory();
  const [nic, setNic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  function sendDetails(e) {
    e.preventDefault();

    const newCustomer = {
      nic,
      firstName,
      lastName,
      password,
      email,
      gender,
      role,
    };

    console.log(newCustomer);

    axios
      .put("https://localhost:7245/api/user/updateUser", newCustomer)
      .then(() => {
        swal({
          title: "Success",
          text: "Update Successful!!",
          icon: "success",
          button: "OK",
        });

        console.log("Update Successful");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => {
        swal({
          title: "Warning",
          text: "Invalid Registration!!",
          icon: "warning",
          button: "OK",
        });

        console.log("Invalid Update");
      });
  }

  const deleteAlldata = () => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`https://localhost:7245/api/User/userDelete/${nic}`)
        .then((response) => {
          console.log(response.data);
          history.push("/");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const loadData = () => {
    axios
      .get(`https://localhost:7245/api/user/getUserByNic/${id}`)
      .then((data) => {
        setNic(data.data.nic);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setEmail(data.data.email);
        setGender(data.data.gender);
        setRole(data.data.role);
        setPassword(data.data.password);
      })
      .catch((err) => {
        swal({
          title: "Warning",
          text: "Invalid!!",
          icon: "warning",
          button: "OK",
        });

        console.log("Invalid ");
      });
  };

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
            <h1 className="mb-3">User Profile</h1>

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
                value={firstName}
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
                value={lastName}
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
                value={email}
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
                value={nic}
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

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE
            </button>

            <button onClick={deleteAlldata} className="btn btn-danger py-3">
              DELETE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
