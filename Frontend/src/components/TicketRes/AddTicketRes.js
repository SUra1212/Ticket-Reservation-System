import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTicketRes() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [allticketres, setAllTicketRes] = useState({});
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  //const [setInputErrorList] = useState({})
  const [ticketres, setTicketRes] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    trainName: "",
    dateRes: "",
    mobileNo: "",
    noOfPassengers: "",
    class: "",
    status: "",
    trainNo: "",
    total: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    trainName: "",
    dateRes: "",
    mobileNo: "",
    noOfPassengers: "",
    class: "",
    status: "",
    trainNo: "",
    total: "",
  });

  const notifyTicketAdd = () => {
    toast.success("Train Reservation added Successfully!", {
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
    axios.get(`https://localhost:7227/api/TicketRes`).then((res) => {
      console.log(res);
      setAllTicketRes(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TrainRes/${id}`).then((res) => {
      console.log(res);
      setTicketRes(res.data);
    });
  }, [id]);

  const handleInput = (e) => {
    e.persist();

    setTicketRes({ ...ticketres, [e.target.name]: e.target.value });

    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!emailPattern.test(value)) {
        setEmailError("Invalid Email Address");
      } else {
        setEmailError(""); // Reset the error message if the email is valid
      }
    }

    if (name === "mobileNo") {
      if (value.length !== 10) {
        setPhoneError("Invalid Phone Number");
      } else {
        setPhoneError(""); // Reset the error message if the phone number is valid
      }
    }

    const updatedTicketRes = Object.assign({}, ticketres, { [name]: value });
    setTicketRes(updatedTicketRes);

    if (name === "class" || name === "noOfPassengers") {
      if (updatedTicketRes.class && updatedTicketRes.noOfPassengers) {
        let classPrice = 0;

        switch (updatedTicketRes.class) {
          case "1st Class":
            classPrice = parseFloat(updatedTicketRes.firstClass);
            break;
          case "2nd Class":
            classPrice = parseFloat(updatedTicketRes.secondClass);
            break;
          case "3rd Class":
            classPrice = parseFloat(updatedTicketRes.thirdClass);
            break;
          default:
            classPrice = 0;
            break;
        }

        const total = classPrice * parseFloat(updatedTicketRes.noOfPassengers);
        setTicketRes({ ...updatedTicketRes, total: total.toFixed(2) });
      }
    }

    setFieldErrors({
      ...fieldErrors,
      [name]: "",
    });
  };

  const SaveTicketRes = (e) => {
    e.preventDefault();

    const errors = {};
    if (!ticketres.firstName) errors.firstName = "First name is required.";
    if (!ticketres.lastName) errors.lastName = "Last name is required.";
    if (!ticketres.email) errors.email = "Email is required.";
    if (!ticketres.nic) errors.nic = "NIC is required.";
    if (!ticketres.trainName) errors.trainName = "Train Name is required.";
    if (!ticketres.date) errors.date = "Date is required.";
    if (!ticketres.mobileNo) errors.mobileNo = "Phone Number is required.";
    if (!ticketres.class) errors.class = "Class is required.";
    if (!ticketres.noOfPassengers)
      errors.noOfPassengers = "Number of passengers is required.";
    if (!ticketres.total) errors.total = "Total is required.";

    // Check for errors and display validation messages
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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

    // Validate maximum 4 reservations per NIC
    const nic = ticketres.nic;
    const reservationsForNIC = allticketres.filter(
      (ticket) => ticket.nic === nic
    );

    const bookingDate = new Date();
    const reservationDate = new Date(ticketres.date);

    // Calculate the difference in months
    const monthDifference =
      (reservationDate.getFullYear() - bookingDate.getFullYear()) * 12 +
      (reservationDate.getMonth() - bookingDate.getMonth());

    if (monthDifference < 1 && reservationsForNIC.length >= 4) {
      alert("Maximum 4 reservations are allowed per NIC within a month.");
      return;
    }

    const data = {
      firstName: ticketres.firstName,
      lastName: ticketres.lastName,
      email: ticketres.email,
      nic: ticketres.nic,
      trainName: ticketres.trainName,
      dateRes: ticketres.date,
      mobileNo: ticketres.mobileNo,
      noOfPassengers: ticketres.noOfPassengers,
      class: ticketres.class,
      status: "Accept",
      trainNo: ticketres.trainNo,
      total: ticketres.total,
    };

    axios
      .post(`https://localhost:7227/api/TicketRes`, data)
      .then((res) => {
        console.log(res);
        notifyTicketAdd();
        setTimeout(() => {
          navigate("/allticketres"); // Navigate after 2 seconds
        }, 2000);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error("Error in adding the Train Reservation!", {
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
      });
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <form
          onSubmit={SaveTicketRes}
          className="container card ticket-res-card"
        >
          <br />
          <center>
            <h3>Create New Reservation </h3>
          </center>
          <br />
          <MDBRow className="mb-4">
            <MDBCol>
              <label>First name</label>
              <MDBInput
                name="firstName"
                value={ticketres.firstName}
                onChange={handleInput}
                className="form-label-top"
              />
              <div className="text-danger">{fieldErrors.firstName}</div>
            </MDBCol>
            <MDBCol>
              <label>Last name</label>
              <MDBInput
                name="lastName"
                value={ticketres.lastName}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.lastName}</div>
            </MDBCol>
          </MDBRow>

          <label>Email</label>
          <MDBInput
            name="email"
            value={ticketres.email}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="email"
            id="form6Example3"
          >
            {emailError && <div className="text-danger">{emailError}</div>}
            <div className="text-danger">{fieldErrors.email}</div>
          </MDBInput>
          <label>NIC</label>
          <MDBInput
            name="nic"
            value={ticketres.nic}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          >
            <div className="text-danger">{fieldErrors.nic}</div>
          </MDBInput>
          <label>Train Name</label>
          <MDBInput
            disabled={true}
            name="trainName"
            value={ticketres.trainName}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          >
            <div className="text-danger">{fieldErrors.trainName}</div>
          </MDBInput>
          <label>Date</label>
          <MDBInput
            disabled={true}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            name="date"
            value={ticketres.date}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          >
            <div className="text-danger">{fieldErrors.date}</div>
          </MDBInput>
          <label>Phone Number</label>
          <MDBInput
            name="mobileNo"
            value={ticketres.mobileNo}
            onChange={handleInput}
            type="number"
            wrapperClass="mb-4"
            id="form6Example6"
          >
            <div className="text-danger">{fieldErrors.mobileNo}</div>
            {phoneError && <div className="text-danger">{phoneError}</div>}
          </MDBInput>
          <label>Class</label>
          <MDBCol>
            <select
              name="class"
              value={ticketres.class}
              onChange={handleInput}
              className="form-select"
            >
              <div className="text-danger">{fieldErrors.class}</div>
              <option value="">Select Class</option>
              <option value="1st Class">1st Class</option>
              <option value="2nd Class">2nd Class</option>
              <option value="3rd Class">3rd Class</option>
            </select>
            <div className="text-danger">{fieldErrors.class}</div>
          </MDBCol>
          <br></br>
          <label>No Of Passengers</label>
          <MDBInput
            name="noOfPassengers"
            value={ticketres.noOfPassengers}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="number"
            id="form6Example6"
          >
            <div className="text-danger">{fieldErrors.noOfPassengers}</div>
          </MDBInput>
          <label>Total Amount</label>
          <MDBInput
            disabled={true}
            name="total"
            value={ticketres.total}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="number"
            id="form6Example6"
          >
            <div className="text-danger">{fieldErrors.total}</div>
          </MDBInput>

          {/* <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /> */}
          {/* 
                <MDBCheckbox
                    wrapperClass='d-flex justify-content-center mb-4'
                    id='form6Example8'
                    label='Create an account?'
                    defaultChecked
                /> */}

          <button type="submit" className="btn">
            Submit
          </button>
          <ToastContainer />
          <br />
        </form>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
