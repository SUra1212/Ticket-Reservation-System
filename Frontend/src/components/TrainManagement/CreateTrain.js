import React, { useState } from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import "./trainmanagement.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoArrowSwitch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer/Footer";

export default function CreateTrain() {
  // const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const [isExistingTrain, setIsExistingTrain] = useState(true);
  const [trainRes, setTrainRes] = useState({
    trainName: "",
    trainNo: "",
    firstClass: "",
    secondClass: "",
    thirdClass: "",
    fromLocation: "",
    departureTime: "",
    toLocation: "",
    arrivalTime: "",
    date: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    trainName: "",
    trainNo: "",
    firstClass: "",
    secondClass: "",
    thirdClass: "",
    fromLocation: "",
    departureTime: "",
    toLocation: "",
    arrivalTime: "",
    date: "",
  });
  const notifyTrainAdd = () => {
    toast.success("Train Schedule added Successfully!", {
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
  const handleTrainTypeChange = (e) => {
    setIsExistingTrain(e.target.checked);
  };

  const handleInput = (e) => {
    e.persist();
    const { name, value } = e.target;

    // Initialize default values for related fields
    let trainNumber = trainRes.trainNo || "";
    let departureLocation = trainRes.fromLocation || "";
    let arrivalLocation = trainRes.toLocation || "";

    // If the changed field is trainName, update related fields

    if (name === "trainName") {
      if (value === "Udarata Menike") {
        departureLocation = "Colombo";
        arrivalLocation = "Badulla";
        trainNumber = "1015";
      } else if (value === "Podi Menike") {
        departureLocation = "Colombo";
        arrivalLocation = "Badulla";
        trainNumber = "1005";
      } else if (value === "Tikiri Menike") {
        departureLocation = "Colombo";
        arrivalLocation = "Nanu Oya";
        trainNumber = "1023";
      } else if (value === "Senkadagala Menike") {
        departureLocation = "Colombo";
        arrivalLocation = "Kandy";
        trainNumber = "4077";
      } else if (value === "Yal Devi") {
        departureLocation = "Mount-Lavinia";
        arrivalLocation = "Kankasanthurai";
        trainNumber = "1035";
      } else if (value === "Uttara Devi") {
        departureLocation = "Colombo Fort";
        arrivalLocation = "Kankasanthurai";
        trainNumber = "4017";
      } else if (value === "Udaya Devi") {
        departureLocation = "Colombo";
        arrivalLocation = "Batticaloa";
        trainNumber = "6011";
      } else if (value === "Rajarata Rejini") {
        departureLocation = "Vavuniya";
        arrivalLocation = "Beliatta";
        trainNumber = "8085";
      } else if (value === "Ruhunu Kumari") {
        departureLocation = "Maradana";
        arrivalLocation = "Matara";
        trainNumber = "3427";
      } else if (value === "Muthu Kumari") {
        departureLocation = "Panadura";
        arrivalLocation = "Chilaw";
        trainNumber = "1035";
      } else if (value === "Samudra Devi") {
        departureLocation = "Colombo";
        arrivalLocation = "Galle";
        trainNumber = "8760";
      } else if (value === "Galu Kumari") {
        departureLocation = "Maradana";
        arrivalLocation = "Beliatta";
        trainNumber = "8056";
      } else if (value === "Sagarika") {
        departureLocation = "Colombo";
        arrivalLocation = "Mathara";
        trainNumber = "8096";
      } else if (value === "Sri Devi") {
        departureLocation = "Colombo";
        arrivalLocation = "Kankesanthurai";
        trainNumber = "4003";
      } else if (value === "Meena Gaya") {
        departureLocation = "Colombo";
        arrivalLocation = "Batticaloa";
        trainNumber = "6079";
      } else if (value === "Badulla night express") {
        departureLocation = "Colombo";
        arrivalLocation = "Badulla";
        trainNumber = "1002";
      } else if (value === "Denuwara Manike") {
        departureLocation = "Colombo";
        arrivalLocation = "Badulla";
        trainNumber = "6075";
      } else if (value === "Pulathisi") {
        departureLocation = "Colombo";
        arrivalLocation = "Batticloa";
        trainNumber = "1035";
      } else if (value === "Dakshina") {
        departureLocation = "Maradhana";
        arrivalLocation = "Beliatta";
        trainNumber = "8054";
      }
    }

    // Update the entire trainRes object
    setTrainRes({
      ...trainRes,
      trainNo: trainNumber,
      fromLocation: departureLocation,
      toLocation: arrivalLocation,
      [name]: value,
    });

    setFieldErrors({
      ...fieldErrors,
      [name]: "",
    });
  };

  const handleSwapLocations = () => {
    // Swap Departure and Arrival values
    setTrainRes({
      ...trainRes,
      fromLocation: trainRes.toLocation,
      toLocation: trainRes.fromLocation,
      trainName: trainRes.trainName,
      trainNo: trainRes.trainNo,
      firstClass: trainRes.firstClass,
      secondClass: trainRes.secondClass,
      thirdClass: trainRes.thirdClass,
      departureTime: trainRes.departureTime,
      arrivalTime: trainRes.arrivalTime,
      date: trainRes.date,
      isExistingTrain: isExistingTrain,
    });
  };

  const SaveTrainRes = (e) => {
    e.preventDefault();

    const errors = {};
    if (!trainRes.trainName) errors.trainName = "Train name is required.";
    if (!trainRes.trainNo) errors.trainNo = "Train no is required.";
    if (!trainRes.firstClass)
      errors.firstClass = "First class price is required.";
    if (!trainRes.secondClass)
      errors.secondClass = "Second class price is required..";
    if (!trainRes.thirdClass)
      errors.thirdClass = "Third class price is required.";
    if (!trainRes.fromLocation)
      errors.fromLocation = "From location is required.";
    if (!trainRes.departureTime)
      errors.departureTime = "Depature time is required.";
    if (!trainRes.toLocation) errors.toLocation = "To location is required.";
    if (!trainRes.arrivalTime)
      errors.arrivalTime = "Arraival time is required.";
    if (!trainRes.date) errors.date = "Date is required.";

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

    // setFormSubmitted(true);
    const data = {
      trainName: trainRes.trainName,
      trainNo: trainRes.trainNo,
      firstClass: trainRes.firstClass,
      secondClass: trainRes.secondClass,
      thirdClass: trainRes.thirdClass,
      fromLocation: trainRes.fromLocation,
      departureTime: trainRes.departureTime,
      toLocation: trainRes.toLocation,
      arrivalTime: trainRes.arrivalTime,
      date: trainRes.date,
      isExistingTrain: isExistingTrain,
    };
    axios
      .post(`https://localhost:7227/api/TrainRes`, data)
      .then((res) => {
        console.log(res);
        notifyTrainAdd(); // Show success toast message
        setTimeout(() => {
          navigate("/alltrain"); // Navigate after 2 seconds
        }, 2000);
        setTrainRes({
          trainName: "",
          trainNo: "",
          firstClass: "",
          secondClass: "",
          thirdClass: "",
          fromLocation: "",
          departureTime: "",
          toLocation: "",
          arrivalTime: "",
          date: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in adding the Train Schedule!", {
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
  };

  return (
    <div className="">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <form onSubmit={SaveTrainRes} className="container card train-res-card">
          <br />
          <center>
            <h3>Create New Train Schedule </h3>
          </center>
          <br />
          <MDBCol>
            <label>Date</label>
            <MDBInput
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={trainRes.date}
              onChange={handleInput}
              id="form6Example2"
            />
            <div className="text-danger">{fieldErrors.date}</div>
          </MDBCol>

          <MDBCol className="mt-4">
            <label>Is it an existing train?</label>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              checked={isExistingTrain}
              onChange={handleTrainTypeChange}
            />
            <div className="text-danger">{fieldErrors.isExistingTrain}</div>
          </MDBCol>
          <br />

          <MDBRow className="mb-2">
            {isExistingTrain && (
              <MDBCol>
                <label>Train Name</label>
                <select
                  name="trainName"
                  value={trainRes.trainName}
                  onChange={handleInput}
                  className="form-select"
                >
                  <option value="">Select Train Name</option>
                  <option value="Udarata Menike">Udarata Menike</option>
                  <option value="Podi Menike">Podi Menike</option>
                  <option value="Tikiri Menike">Tikiri Menike</option>
                  <option value="Senkadagala Menike">Senkadagala Menike</option>
                  <option value="Yal Devi">Yal Devi</option>
                  <option value="Uttara Devi">Uttara Devi</option>
                  <option value="Udaya Devi">Udaya Devi</option>
                  <option value="Rajarata Rejini">Rajarata Rejini</option>
                  <option value="Ruhunu Kumari">Ruhunu Kumari</option>
                  <option value="Muthu Kumari">Muthu Kumari</option>
                  <option value="Samudra Devi">Samudra Devi</option>
                  <option value="Galu Kumari">Galu Kumari</option>
                  <option value="Sagarika">Sagarika</option>
                  <option value="Dakshina">Dakshina</option>
                  <option value="Pulathisi">Pulathisi</option>
                  <option value="Denuwara Manike">Denuwara Manike</option>
                  <option value="Badulla night express">
                    Badulla night express
                  </option>
                  <option value="Meena Gaya">Meena Gaya</option>
                  <option value="Sri Devi">Sri Devi</option>
                </select>
              </MDBCol>
            )}
            <div className="text-danger">{fieldErrors.trainName}</div>
          </MDBRow>
          {!isExistingTrain && (
            <MDBCol className="mb-4">
              <label>Enter New Train Name</label>
              <MDBInput
                name="trainName"
                value={trainRes.trainName}
                onChange={handleInput}
              />
              <div className="text-danger">{fieldErrors.trainName}</div>
            </MDBCol>
          )}
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Train Number</label>
              <MDBInput
                name="trainNo"
                value={trainRes.trainNo}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.trainNo}</div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Departure</label>
              <MDBInput
                name="fromLocation"
                value={trainRes.fromLocation}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.fromLocation}</div>
            </MDBCol>

            <MDBCol>
              <button
                type="button" // Add this line to specify the button type
                onClick={handleSwapLocations}
                className="swap-button"
              >
                Swap <GoArrowSwitch />
              </button>
            </MDBCol>
            <MDBCol>
              <label>Arraival</label>
              <MDBInput
                name="toLocation"
                value={trainRes.toLocation}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.toLocation}</div>
            </MDBCol>
          </MDBRow>
          <br />

          <MDBRow className="mt-3">
            <MDBCol>
              <label>1st Class Seat Price</label>
              <MDBInput
                name="firstClass"
                value={trainRes.firstClass}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.firstClass}</div>
            </MDBCol>

            <MDBCol>
              <label>2st Class Seat Price</label>
              <MDBInput
                name="secondClass"
                value={trainRes.secondClass}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.secondClass}</div>
            </MDBCol>
            <MDBCol>
              <label>3st Class Seat Price</label>
              <MDBInput
                name="thirdClass"
                value={trainRes.thirdClass}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.thirdClass}</div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Departure Time</label>
              <MDBInput
                type="time"
                name="departureTime"
                value={trainRes.departureTime}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.departureTime}</div>
            </MDBCol>
            <MDBCol>
              <label>Arrival Time</label>
              <MDBInput
                type="time"
                name="arrivalTime"
                value={trainRes.arrivalTime}
                onChange={handleInput}
                id="form6Example2"
              />
              <div className="text-danger">{fieldErrors.arrivalTime}</div>
            </MDBCol>
          </MDBRow>

          <br />
          <button type="submit" className="btn btn-primary">
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
