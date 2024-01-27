import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import Header from "../Header";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  
const EditUserDetails = () => {
  const [nic, setNic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  let navigate = useNavigate();


  const { id } = useParams();

  const notifyTicketUpdate = () => {
    toast.success("User Details Updated Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  function sendDetails(e) {
    e.preventDefault();

    const newCustomer = {
      nic,
      firstName,
      lastname,
      password,
      email,
      gender,
    };

    console.log(newCustomer);

    axios
      .put(`https://localhost:7227/api/userMobile/update/${id}`, newCustomer)
      .then(() => {
        notifyTicketUpdate();
        setTimeout(() => {
          navigate("/alltravellerdetails"); // Navigate after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        // alert({
        //   title: "Warning",
        //   text: "Invalid Registration!!",
        //   icon: "warning",
        //   button: "OK",
        // });

        console.log("Invalid Update");
      });
  }

  

  const loadData = () => {
    axios
      .get(`https://localhost:7227/userMobile/${id}`)
      .then((data) => {
        console.log(data)
        setNic(data.data.nic);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastname);
        setEmail(data.data.email);
        setGender(data.data.gender);
        setPassword(data.data.password);
      })
      .catch((err) => {
        alert({
          title: "Warning",
          text: "Invalid!!",
          icon: "warning",
          button: "OK",
        });

        console.log("Invalid ");
      });
  };

  return (
 
    <div>
      <Header/>
    <br /> <br /> <br />
    <MDBContainer
      fluid className='p-4'>
      <form onSubmit={sendDetails}
        encType="multipart/form-data">
        <MDBRow>
          {/* 
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            The best offer <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol> */}

          <MDBCol md='6' className='position-relative'>

            {/* <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div> */}

            <MDBCard style={{ width: '85%', height: '80%', marginLeft: '60%' }} className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>

                <center>
                  <h3>Edit User Details</h3>
                </center>
                <br />

                <MDBRow>
                  <MDBCol col='6'>
                    <label>First Name</label>
                    <MDBInput type="text"
                      id="fname"
                      name="fname"
                      className="form-control"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}  value={firstName} placeholder="Enter your first name" wrapperClass='mb-4' />
                  </MDBCol>

                  <MDBCol col='6'>
                    <label>Last Name</label>
                    <MDBInput type="text"
                      id="lname"
                      className="form-control"
                      name="lname"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}  value={lastname} placeholder="Enter your last name" wrapperClass='mb-4' />
                  </MDBCol>
                </MDBRow>

                <label>Email</label>
                <MDBInput type="email"
                  id="cemail"
                  className="form-control"
                  name="cemail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}  value={email} placeholder="Enter your email name" wrapperClass='mb-4' />

                <MDBRow>
                  <MDBCol col='6'>
                    <label>NIC</label>
                    <MDBInput type="text"
                      id="nic"
                      name="nic"
                      className="form-control"
                      onChange={(e) => {
                        setNic(e.target.value);
                      }}  value={nic} placeholder="Enter your NIC" wrapperClass='mb-4' />
                  </MDBCol>
                  <MDBCol col='6'>
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

                {/* <br />
              <label>Passsword</label>
              <MDBInput type="password"
                id="cpassword"
                className="form-control"
                name="cpassword"
                onChange={(e) => {
                  setPassword(e.target.value);
                }} placeholder="Enter password" wrapperClass='mb-4' /> */}

                <br /><br />
                <button
                  id="register_button" className='w-100 mb-4 btn btn-primary' size='md'>Update</button>
               

                <div className="text-center">

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='facebook-f' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='twitter' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='google' size="sm" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                    <MDBIcon fab icon='github' size="sm" />
                  </MDBBtn>

                </div>

              </MDBCardBody>
            </MDBCard>
            <ToastContainer />

          </MDBCol>

        </MDBRow>

      </form>
    </MDBContainer>
    <Footer/>
  </div>
  );
};

export default EditUserDetails;
