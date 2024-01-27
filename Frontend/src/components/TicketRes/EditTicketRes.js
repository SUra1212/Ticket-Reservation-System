import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTicketRes() {
  let { id } = useParams();

  const navigate = useNavigate();
  // const [setInputErrorList] = useState({})
  const [ticketres, setTicketRes] = useState({});
  // const [trainres, setTrainRes] = useState({})
  const [firstClass, setFirstClass] = useState(0);
  const [secondClass, setSecondClass] = useState(0);
  const [thirdClass, setThirdClass] = useState(0);

  const notifyTicketUpdate = () => {
    toast.success("Train Reservation Updated Successfully!", {
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
    axios.get(`https://localhost:7227/api/TicketRes/${id}`).then((res) => {
      console.log(res);
      console.log(res.data.trainName);
      setTicketRes(res.data);
    });
  }, [id]);

  // useEffect(() => {
  //     axios.get(`https://localhost:7227/api/TicketRes/${id}`).then((res) => {
  //         console.log(res);
  //         const ticketResTrainName = res.data.trainName;

  //         axios.get(`https://localhost:7227/api/TrainRes`).then((res) => {
  //             console.log(res);

  //             // Assuming that 'res.data' is the array of train data
  //             const trainData = res.data;

  //             // Map through the array and compare 'trainName' property with 'ticketResTrainName'
  //             trainData.forEach((train) => {
  //                 if (train.trainName === ticketResTrainName) {
  //                     console.log('Train Name:', train.firstClass);
  //                     console.log('From Location:', train.secondClass);
  //                     console.log('To Location:', train.thirdClass);
  //                     // Add more properties as needed
  //                 }
  //             });

  //             // You can also set the entire array in your state if required
  //             setTrainRes(trainData);
  //         });
  //     });
  // }, [id]);

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TrainRes`).then((res) => {
      const trainData = res.data;
      const foundTrain = trainData.find(
        (train) => train.trainName === ticketres.trainName
      );

      if (foundTrain) {
        setFirstClass(parseFloat(foundTrain.firstClass));
        setSecondClass(parseFloat(foundTrain.secondClass));
        setThirdClass(parseFloat(foundTrain.thirdClass));
      }
    });
  }, [ticketres.trainName]);

  const handleInput = (e) => {
    e.persist();
    setTicketRes({ ...ticketres, [e.target.name]: e.target.value });

    const name = e.target.name;
    const value = e.target.value;

    const updatedTicketRes = { ...ticketres, [name]: value };
    setTicketRes(updatedTicketRes);

    if (name === "class" || name === "noOfPassengers") {
      if (updatedTicketRes.class && updatedTicketRes.noOfPassengers) {
        let classPrice = 0;

        switch (updatedTicketRes.class) {
          case "1st Class":
            classPrice = firstClass;
            break;
          case "2nd Class":
            classPrice = secondClass;
            break;
          case "3rd Class":
            classPrice = thirdClass;
            break;
          default:
            classPrice = 0;
            break;
        }

        const total = classPrice * parseFloat(updatedTicketRes.noOfPassengers);
        setTicketRes({ ...updatedTicketRes, total: total.toFixed(2) });
      }
    }
  };

  const UpdateTicketRes = (e) => {
    e.preventDefault();
    if (
      !ticketres.firstName ||
      !ticketres.lastName ||
      !ticketres.email ||
      !ticketres.nic ||
      !ticketres.dateRes ||
      !ticketres.trainName ||
      !ticketres.mobileNo ||
      !ticketres.noOfPassengers ||
      !ticketres.class ||
      !ticketres.total
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
    const data = {
      id: ticketres.id,
      firstName: ticketres.firstName,
      lastName: ticketres.lastName,
      email: ticketres.email,
      nic: ticketres.nic,
      dateRes: ticketres.dateRes,
      trainName: ticketres.trainName,
      mobileNo: ticketres.mobileNo,
      noOfPassengers: ticketres.noOfPassengers,
      class: ticketres.class,
      total: ticketres.total,
      status: "Accept",
    };
    axios
      .put(`https://localhost:7227/api/TicketRes/${id}`, data)
      .then((res) => {
        notifyTicketUpdate();
        console.log(res);
        setTimeout(() => {
          navigate("/allticketres"); // Navigate after 2 seconds
        }, 2000);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error("Error in Updating the Train Reservation!", {
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
      <div className="page-container">
        <form
          onSubmit={UpdateTicketRes}
          className="container card ticket-res-card"
        >
          <br />
          <center>
            <h3>Edit Reservation </h3>
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
            </MDBCol>
            <MDBCol>
              <label>Last name</label>
              <MDBInput
                name="lastName"
                value={ticketres.lastName}
                onChange={handleInput}
                id="form6Example2"
              />
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
          />
          <label>NIC</label>
          <MDBInput
            name="nic"
            value={ticketres.nic}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          />
          <label>Train Name</label>
          <MDBInput
            name="trainName"
            value={ticketres.trainName}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          />
          <label>Date</label>
          <MDBInput
            type="date"
            min={new Date().toISOString().split("T")[0]}
            name="date"
            value={ticketres.dateRes}
            onChange={handleInput}
            wrapperClass="mb-4"
            id="form6Example4"
          />
          <label>Phone Number</label>
          <MDBInput
            name="mobileNo"
            value={ticketres.mobileNo}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="tel"
            id="form6Example6"
          />
          <label>Class</label>
          <select
            name="class"
            value={ticketres.class}
            onChange={handleInput}
            className="form-select"
          >
            <option value="">Select Class</option>
            <option value="1st Class">1st Class</option>
            <option value="2nd Class">2nd Class</option>
            <option value="3rd Class">3rd Class</option>
          </select>
          <br></br>
          <label>No Of Passengers</label>
          <MDBInput
            name="noOfPassengers"
            value={ticketres.noOfPassengers}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="number"
            id="form6Example6"
          />
          <label>Total Amount</label>
          <MDBInput
            name="total"
            value={ticketres.total}
            onChange={handleInput}
            wrapperClass="mb-4"
            type="number"
            id="form6Example6"
          />

          {/* <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /> */}
          {/* 
            <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form6Example8'
                label='Create an account?'
                defaultChecked
            /> */}

          <button type="submit" className="btn btn-primary">
            Update
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
