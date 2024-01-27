import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "./trainmanagement.css";
import Header from "../Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllTrain() {
  const [trainRes, setTrainRes] = useState([]);
  const [ticketRes, setTicketRes] = useState([]);
  const [ticketResTrainNos, setTicketResTrainNos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrainRes, setFilteredTrainRes] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TrainRes`).then((res) => {
      console.log(res);
      setTrainRes(res.data);
      setFilteredTrainRes(res.data); // Initialize filtered data with all train data
    });
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the train data based on the search query
    const filteredData = trainRes.filter((item) => {
      const trainName = item.trainName?.toLowerCase() || "";
      const trainNo = item.trainNo?.toLowerCase() || "";
      const departureTime = item.departureTime?.toLowerCase() || "";
      const arrivalTime = item.arrivalTime?.toLowerCase() || "";
      const fromLocation = item.fromLocation?.toLowerCase() || "";
      const toLocation = item.toLocation?.toLowerCase() || "";
      const date = item.date?.toLowerCase() || "";

      return (
        trainName.includes(query.toLowerCase()) ||
        trainNo.includes(query.toLowerCase()) ||
        departureTime.includes(query.toLowerCase()) ||
        arrivalTime.includes(query.toLowerCase()) ||
        fromLocation.includes(query.toLowerCase()) ||
        toLocation.includes(query.toLowerCase()) ||
        date.includes(query.toLowerCase())
      );
    });

    setFilteredTrainRes(filteredData);
  };

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TicketRes`).then((res) => {
      console.log(res);
      setTicketRes(res.data);

      // Extract trainNo values from ticketRes and store them in an array
      const trainNos = res.data.map((ticket) => ticket.trainNo);
      setTicketResTrainNos(trainNos);
    });
  }, []);

  // Function to check if trainNo exists in ticketResTrainNos
  const isTrainNoInTicketRes = (trainNo) => {
    return ticketResTrainNos.includes(trainNo);
  };

  const deleteTrainRes = (e, id, trainNoToDelete) => {
    e.preventDefault();

    // Check if trainNoToDelete exists in ticketResTrainNos
    if (isTrainNoInTicketRes(trainNoToDelete)) {
      const shouldView = window.confirm(
        "Cannot delete. TrainNo is in use. Do you want to view the user's NIC?"
      );

      if (shouldView) {
        const matchingTickets = ticketRes.filter(
          (ticket) => ticket.trainNo === trainNoToDelete
        );

        if (matchingTickets.length > 0) {
          const matchingTicketIds = matchingTickets.map((ticket) => ticket.nic);
          const alertMessage = `TrainNo ${trainNoToDelete} is in use by NIC: ${matchingTicketIds.join(
            ", "
          )}`;
          showStyledAlert(alertMessage);
        } else {
          showStyledAlert("Train number not found.");
        }
      }
    } else {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (shouldDelete) {
        const thisClicked = e.currentTarget;

        axios
          .delete(`https://localhost:7227/api/TrainRes/${id}`)
          .then((res) => {
            console.log(res);
            toast.success("Train Schedule deleted successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            thisClicked.closest("tr").remove();
          })
          .catch(function (error) {
            console.log(error);
            toast.error("Failed to delete Train Schedule!", {
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
    }
  };

  const showStyledAlert = (message) => {
    // Create a div element for the alert
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("styled-alert");

    // Create a p element for the message
    const messageElement = document.createElement("p");
    messageElement.textContent = message;

    // Create a button to close the alert
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      alertDiv.remove();
    });

    // Append message and close button to the alert div
    alertDiv.appendChild(messageElement);
    alertDiv.appendChild(closeButton);

    // Append the alert div to the body
    document.body.appendChild(alertDiv);
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <center>
        <div style={{ width: "85%" }} className="mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="form-control"
          />
        </div>
      </center>
      <div>
      <MDBRow>
      <MDBCol style={{marginLeft: '73%'}} className="d-flex justify-content-end">
      <Link to={"/dashboard"}>
          <button  className="btn btn-success">
            Dashboard
          </button>
        </Link>
      </MDBCol>

      <MDBCol style={{marginRight: '2%'}} className="d-flex justify-content-end">
        <Link to={"/createtrain"}>
          <button className="btn btn-success">
            Train Shedule
          </button>
        </Link>
        </MDBCol>
        </MDBRow>
   
      </div>
      <br />
      <center>
        <MDBTable className="style custom-table" style={{ width: "98%" }}>
          <MDBTableHead dark>
            <tr>
              <th style={{ textAlign: "center" }}>Id</th>
              <th style={{ textAlign: "center" }}>Train Name</th>
              <th style={{ textAlign: "center" }}>Train Number</th>
              {/* <th style={{ textAlign: "center" }}>1st Class Seat price</th>
              <th style={{ textAlign: "center" }}>2nd Class Seat price</th>
              <th style={{ textAlign: "center" }}>3rd Class Seat price</th> */}
              <th style={{ textAlign: "center" }}>Departure</th>
              <th style={{ textAlign: "center" }}>Departure Time</th>
              <th style={{ textAlign: "center" }}>Arraival</th>
              <th style={{ textAlign: "center" }}>Arraival Time</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {filteredTrainRes.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <th>{item.trainName}</th>
                  <th>{item.trainNo}</th>
                  {/* <th>{item.firstClass}</th>
        <th>{item.secondClass}</th>
        <th>{item.thirdClass}</th> */}
                  <th>{item.fromLocation}</th>
                  <th>{item.departureTime}</th>
                  <th>{item.toLocation}</th>
                  <th>{item.arrivalTime}</th>
                  <th>{item.date}</th>
                  <td>
                    <Link to={`/edittrain/${item.id}`}>
                      <button className="btn btn-edit yellow-button">
                        <i className="bi bi-pencil-square"></i>
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={(e) => deleteTrainRes(e, item.id, item.trainNo)}
                      className="btn btn-delete red-button"
                    >
                      Delete
                    </button>
                    <Link to={`/viewtrain/${item.id}`}>
                      <button className="btn btn-edit yellow-button">
                        <i className="bi bi-pencil-square"></i>
                        View
                      </button>
                      <ToastContainer />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </center>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
