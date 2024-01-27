import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import "./trainmanagement.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";
import Footer from "../footer/Footer";

export default function ViewTrain() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [isExistingTrain, setIsExistingTrain] = useState(true);
  const [trainRes, setTrainRes] = useState({});

  // const notifyTrainUpdate = () => {
  //   toast.success("Train Schedule updated Successfully!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // };

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TrainRes/${id}`).then((res) => {
      console.log(res);
      setTrainRes(res.data);
    });
  }, [id]);

  const handleTrainTypeChange = (e) => {
    setIsExistingTrain(e.target.checked);
    setTrainRes({ ...trainRes, trainName: "" }); // Reset trainName when switching between existing and new train
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
        arrivalLocation = "Nano Oya";
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
  };

  const UpdateTrainRes = (e) => {
    e.preventDefault();
    const data = {
      id: trainRes.id,
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
    };
    axios
      .put(`https://localhost:7227/api/TrainRes/${id}`, data)
      .then((res) => {
        console.log(res);
        navigate("/alltrain");
        // alert(res.data.message);
      })
      .catch(function (error) {
        if (error.response) {
        }
      });
  };

  return (
    <div className="">
      <Header/>
      <br /><br /><br /><br /><br /><br />
      <div className="container">
        <form onSubmit={UpdateTrainRes} className="container card train-res-card">
          <br />
          <center>
            <h3>View Train Schedule </h3>
          </center>
          <br />
          <MDBCol>
            <label>Date</label>
            <MDBInput
            disabled={true}
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={trainRes.date}
              onChange={handleInput}
              id="form6Example2"
            />
          </MDBCol>

          <MDBCol className="mt-4">
            <label>Is it an existing train?</label>
            &nbsp;&nbsp;
            <input
            disabled={true}
              type="checkbox"
              checked={isExistingTrain}
              onChange={handleTrainTypeChange}
            />
          </MDBCol>
          <br />

          <MDBRow className="mb-2">
            {isExistingTrain && (
              <MDBCol>
                <label>Train Name</label>
                <select
                disabled={true}
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
          </MDBRow>
          {!isExistingTrain && (
            <MDBCol className="mb-4">
              <label>Enter New Train Name</label>
              <MDBInput
              disabled={true}
                name="trainName"
                value={trainRes.trainName}
                onChange={handleInput}
              />
            </MDBCol>
          )}
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Train Number</label>
              <MDBInput
              disabled={true}
                name="trainNo"
                value={trainRes.trainNo}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Departure</label>
              <MDBInput
              disabled={true}
                name="fromLocation"
                value={trainRes.fromLocation}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>

            <MDBCol>
              {/* <button
              disabled={true}
                type="button" // Add this line to specify the button type
                className="swap-button"
              >
                Swap <GoArrowSwitch />
              </button> */}
            </MDBCol>
            <MDBCol>
              <label>Arraival</label>
              <MDBInput
              disabled={true}
                name="toLocation"
                value={trainRes.toLocation}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
          </MDBRow>
          <br/>

          <MDBRow className="mt-3">
            <MDBCol>
              <label>1st Class Seat Price</label>
              <MDBInput
              disabled={true}
                name="firstClass"
                value={`Rs: ${parseFloat(trainRes.firstClass).toFixed(2)}`}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>

            <MDBCol>
              <label>2st Class Seat Price</label>
              <MDBInput
              disabled={true}
                name="secondClass"
                value={`Rs: ${parseFloat(trainRes.secondClass).toFixed(2)}`}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
            <MDBCol>
              <label>3st Class Seat Price</label>
              <MDBInput
              disabled={true}
                name="thirdClass"
                value={`Rs: ${parseFloat(trainRes.thirdClass).toFixed(2)}`}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol>
              <label>Departure Time</label>
              <MDBInput
              disabled={true}
                type="time"
                name="departureTime"
                value={trainRes.departureTime}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
            <MDBCol>
              <label>Arrival Time</label>
              <MDBInput
              disabled={true}
                type="time"
                name="arrivalTime"
                value={trainRes.arrivalTime}
                onChange={handleInput}
                id="form6Example2"
              />
            </MDBCol>
          </MDBRow>
        
          <br />

          {/* <button
            // onClick={notifyTrainAdd}
            type="submit"
            // style={{
            //   width: "400px",
            //   borderRadius: "5px",
            //   margin: "0 auto",
            //   marginBottom: "30px",
            //   marginTop: "20px",
            // }}
            className="btn btn-primary submit-button"
          >
            
          </button> */}
          <br />
          <ToastContainer />
        </form>
      </div>
      <br/><br/><br/>
      <Footer/>
    </div>
  );
}
