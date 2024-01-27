import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
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

const Login = () => {
  let navigate = useNavigate();

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

    const res = await fetch("https://localhost:7227/api/auth/login", {
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
      // alert({
      //   title: "Warning",
      //   text: "Invalid Credentials !!",
      //   icon: "warning",
      //   button: "OK",
      // });
      console.log("Invalid Credentials");
      toast.error("Invalid credentials!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (res.status === 200) {
      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data?.user));

      // alert({
      //   title: "Success",
      //   text: "Login Successfully !!",
      //   icon: "success",
      //   button: "OK",
      // });
      console.log("Login Successfully !!");
      toast.success("User logged in successfully!", {
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
        navigate("/dashboard"); // Navigate after 2 seconds
      }, 2000);
    } else {
      // alert({
      //   title: "Error",
      //   text: "An error occurred while logging in.",
      //   icon: "error",
      //   button: "OK",
      // });
      console.log("An error occurred while logging in.");
       toast.error("An error occurred while logging in! Try again!", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
    }
  };

  return (
    <div>
      <Header />
      <br /> <br /> <br />
      <MDBContainer
        method="POST"
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
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
              Welcome to TicketTraverse Railway Operations Hub, your gateway to
              seamless train reservation management! Access real-time bookings,
              manage schedules, and optimize passenger experiences effortlessly.
              Dive into a world of efficient rail services. All aboard!
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
              style={{ width: "65%", height: "75%" }}
              className="m-5 bg-glass"
            >
              <MDBCardBody className="p-5">
                <center>
                  <h3>Login</h3>
                </center>
                <br />
                <label>NIC</label>
                <MDBInput
                  id="nic"
                  name="nic"
                  value={nic}
                  onChange={(e) => setNiv(e.target.value)}
                  wrapperClass="mb-4"
                  type="text"
                />

                <label>Password</label>
                <MDBInput
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  wrapperClass="mb-4"
                />

                <br />
                <button
                  id="signin"
                  name="signin"
                  value="Login"
                  onClick={loginCustomer}
                  className="w-100 mb-4 btn btn-primary"
                  size="md"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <a href="/register">
                    <p style={{ marginLeft: "78%" }}>Sign Up?</p>
                  </a>

                  <MDBBtn
                    tag="a1"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a1"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a1"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a1"
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
        <br />
      </MDBContainer>
      <Footer />
    </div>
  );
};

export default Login;
