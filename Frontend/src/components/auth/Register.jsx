import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import Header from "../Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let navigate = useNavigate();
  const [nic, setNic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  function sendDetails(e) {
    e.preventDefault();
    if (
      !nic ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !role
    ) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

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
      .post("https://localhost:7227/api/User", newCustomer)
      .then(() => {
        // alert({
        //   title: "Success",
        //   text: "Registration Successful!!",
        //   icon: "success",
        //   button: "OK",
        // });

        console.log("Registration Successful");
        toast.success("User registered successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/login"); // Navigate after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        // alert({
        //   title: "Warning",
        //   text: "Invalid Registration!!",
        //   icon: "warning",
        //   button: "OK",
        // });

        console.log("Invalid Registration", err);
        toast.error("Error occured while registering the user! Try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }

  return (
    // <Fragment>
    //   <div className="row wrapper">
    //     <div className="col-10 col-lg-4">
    //       <form
    //         action=""
    //         onSubmit={sendDetails}
    //         className="shadow-lg"
    //         encType="multipart/form-data"
    //       >
    //         <h1 className="mb-3">Register</h1>

    //         <div className="form-group">
    //           <label htmlFor="email_field">First Name</label>
    //           <input
    //             type="text"
    //             id="fname"
    //             name="fname"
    //             className="form-control"
    //             onChange={(e) => {
    //               setFirstName(e.target.value);
    //             }}
    //             placeholder="Enter First Name"
    //             required
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="email_field">Last Name</label>
    //           <input
    //             type="text"
    //             id="lname"
    //             className="form-control"
    //             name="lname"
    //             onChange={(e) => {
    //               setLastName(e.target.value);
    //             }}
    //             placeholder="Enter Last Name"
    //             required
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="email_field">Email</label>
    //           <input
    //             type="email"
    //             id="cemail"
    //             className="form-control"
    //             name="cemail"
    //             onChange={(e) => {
    //               setEmail(e.target.value);
    //             }}
    //             placeholder="Enter Email"
    //             required
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="nic_field">NIC</label>
    //           <input
    //             type="text"
    //             id="nic"
    //             name="nic"
    //             className="form-control"
    //             onChange={(e) => {
    //               setNic(e.target.value);
    //             }}
    //             placeholder="Enter NIC"
    //             required
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="gender_field">Gender</label>
    //           <select
    //             id="gender_field"
    //             className="form-control"
    //             name="gender"
    //             onChange={(e) => {
    //               setGender(e.target.value);
    //             }}
    //             value={gender}
    //             required
    //           >
    //             <option value="">Select Gender</option>
    //             <option value="male">Male</option>
    //             <option value="female">Female</option>
    //             <option value="other">Other</option>
    //           </select>
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="role_field">Role</label>
    //           <select
    //             id="role_field"
    //             className="form-control"
    //             name="role"
    //             onChange={(e) => {
    //               setRole(e.target.value);
    //             }}
    //             value={role}
    //             required
    //           >
    //             <option>select</option>
    //             <option value="BackOffice">Back Office</option>
    //             <option value="TravelAgent">Travel Agent</option>
    //           </select>
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="password_field">Password</label>
    //           <input
    //             type="password"
    //             id="cpassword"
    //             className="form-control"
    //             name="cpassword"
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //             }}
    //             placeholder="Enter Password"
    //             required
    //           />
    //         </div>

    //         <button
    //           id="register_button"
    //           type="submit"
    //           className="btn btn-block py-3"
    //         >
    //           REGISTER
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </Fragment>
    <div>
      <Header />
      <br /> <br /> <br />
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <form onSubmit={sendDetails} encType="multipart/form-data">
          <MDBRow>
            <MDBCol
              md="6"
              className="text-center text-md-start d-flex flex-column justify-content-center"
            >
              <h1
                className="my-5 display-3 fw-bold ls-tight px-3"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Railway <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  Operations Hub
                </span>
              </h1>

              <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
                Join TrackMaster, your gateway to unparalleled railway
                management. As a back-office user, you'll enjoy a streamlined
                experience in overseeing bookings, optimizing schedules, and
                ensuring a delightful journey for every passenger. Let's
                redefine travel excellence together. All aboard the future of
                railway operations!
              </p>
            </MDBCol>

            <MDBCol md="6" className="position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <MDBCard
                style={{ width: "85%", height: "80%" }}
                className="my-5 bg-glass"
              >
                <MDBCardBody className="p-5">
                  <center>
                    <h3>Register</h3>
                  </center>
                  <br />

                  <MDBRow>
                    <MDBCol col="6">
                      <label>First Name</label>
                      <MDBInput
                        type="text"
                        id="fname"
                        name="fname"
                        className="form-control"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        placeholder="Enter your first name"
                        wrapperClass="mb-4"
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <label>Last Name</label>
                      <MDBInput
                        type="text"
                        id="lname"
                        className="form-control"
                        name="lname"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        placeholder="Enter your last name"
                        wrapperClass="mb-4"
                      />
                    </MDBCol>
                  </MDBRow>

                  <label>Email</label>
                  <MDBInput
                    type="email"
                    id="cemail"
                    className="form-control"
                    name="cemail"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Enter your email name"
                    wrapperClass="mb-4"
                  />

                  <MDBRow>
                    <MDBCol col="6">
                      <label>NIC</label>
                      <MDBInput
                        type="text"
                        id="nic"
                        name="nic"
                        className="form-control"
                        onChange={(e) => {
                          setNic(e.target.value);
                        }}
                        placeholder="Enter your NIC"
                        wrapperClass="mb-4"
                      />
                    </MDBCol>
                    <MDBCol col="6">
                      <label>Gender</label>
                      <select
                        id="gender_field"
                        className="form-control"
                        name="gender"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        value={gender}
                      >
                        <option value="">Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </MDBCol>
                  </MDBRow>

                  <label>Role</label>
                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    value={role}
                  >
                    <option value="">Select your role</option>
                    <option value="BackOffice">BackOffice</option>
                    <option value="TravelAgent">TravelAgent</option>
                  </select>

                  <br />
                  <label>Passsword</label>
                  <MDBInput
                    type="password"
                    id="cpassword"
                    className="form-control"
                    name="cpassword"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter password"
                    wrapperClass="mb-4"
                  />

                  <button
                    id="register_button"
                    className="w-100 mb-4 btn btn-primary"
                    size="md"
                  >
                    Sign Up
                  </button>

                  <div className="text-center">
                    <a href="/login">
                      <p style={{ marginLeft: "70%" }}>Already Registerd</p>
                    </a>
                    <br />

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              <ToastContainer />
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
      <Footer />
    </div>
  );
};

export default Register;
