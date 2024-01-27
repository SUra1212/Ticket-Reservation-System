import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./ticketres.css";
import Footer from "../footer/Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllTicketRes() {
  const [ticketres, setTicketRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrainRes, setFilteredTrainRes] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7227/api/TicketRes`).then((res) => {
      console.log(res);
      setTicketRes(res.data);
      setFilteredTrainRes(res.data); // Initialize filtered data with all train data
    });
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the train data based on the search query
    const filteredData = ticketres.filter((item) => {
      const nic = typeof item.nic === "string" ? item.nic.toLowerCase() : "";
      const mobileNo =
        typeof item.mobileNo === "string" ? item.mobileNo.toLowerCase() : "";
      const dateRes =
        typeof item.dateRes === "string" ? item.dateRes.toLowerCase() : "";
      const noOfPassengers =
        typeof item.noOfPassengers === "string"
          ? item.noOfPassengers.toLowerCase()
          : "";
      const total =
        typeof item.total === "string" ? item.total.toLowerCase() : "";
      const status =
        typeof item.status === "string" ? item.status.toLowerCase() : "";

      return (
        nic.includes(query.toLowerCase()) ||
        mobileNo.includes(query.toLowerCase()) ||
        dateRes.includes(query.toLowerCase()) ||
        noOfPassengers.includes(query.toLowerCase()) ||
        total.includes(query.toLowerCase()) ||
        status.includes(query.toLowerCase())
      );
    });

    setFilteredTrainRes(filteredData);
  };

  const deleteTicketRes = (e, id) => {
    e.preventDefault();

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(`https://localhost:7227/api/TicketRes/${id}`)
        .then((res) => {
          console.log(res);
          toast.success("Train Reservation deleted successfully!", {
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
          if (error.response) {
            toast.error("Failed to delete Train Reservation!", {
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
    }
  };

  const isEditable = (reservationDate) => {
    // Calculate the date 5 days before the reservation
    const fiveDaysBefore = new Date(reservationDate);
    fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);

    // Compare with the current date
    const currentDate = new Date();

    return currentDate <= fiveDaysBefore;
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

      <MDBRow>
        <MDBCol style={{ marginLeft: '73%' }} className="d-flex justify-content-end">
          <Link to={"/dashboard"}>
            <button className="btn btn-success">
              Dashboard
            </button>
          </Link>
        </MDBCol>

        <MDBCol style={{ marginRight: '2%' }} className="d-flex justify-content-end">
          <Link to={"/serachshedule"}>
            <button className="btn btn-success">
              Train Shedule
            </button>
          </Link>
        </MDBCol>
      </MDBRow>

      <br />
      <div>
        <center>
          <MDBTable className="style custom-table" style={{ width: "97%" }}>
            <MDBTableHead className="style" dark>
              <tr>
                <th style={{ textAlign: "center" }}>Id</th>
                {/* <th style={{ textAlign: "center" }}>FirstName</th>
                <th style={{ textAlign: "center" }}>LastName</th> */}
                {/* <th style={{ textAlign: "center" }}>Email</th> */}
                <th style={{ textAlign: "center" }}>NIC</th>
                <th style={{ textAlign: "center" }}>MobileNo</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Passengers</th>
                <th style={{ textAlign: "center" }}>Class</th>
                <th style={{ textAlign: "center" }}>TotalAmount</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {filteredTrainRes.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    {/* <th>{item.firstName}</th>
                      <th>{item.lastName}</th> */}
                    {/* <th>{item.email}</th> */}
                    <th>{item.nic}</th>
                    <th>{item.mobileNo}</th>
                    <th>{item.dateRes}</th>
                    <th>{item.noOfPassengers}</th>
                    <th>{item.class}</th>
                    <th>{item.total.toFixed(2)}</th>
                    <th>{item.status}</th>
                    <td>
                      {isEditable(item.dateRes) ? (
                        <Link to={`/editticketres/${item.id}`}>
                          <button className="btn btn-edit">
                            <i className="bi bi-pencil-square"></i>
                            Edit
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-edit" disabled>
                          <i className="bi bi-pencil-square"></i>
                          Edit(Not Available)
                        </button>
                      )}

                      {/* <Link to={`/cancelticketres/${item.id}`}>
                            <button className="btn btn-edit">
                              <i className="bi bi-pencil-square"></i>
                              cancel
                            </button>
                          </Link> */}
                      {isEditable(item.dateRes) ? (
                        <Link to={`/cancelticketres/${item.id}`}>
                          <button className="btn btn-edit">
                            <i className="bi bi-pencil-square"></i>
                            Cancel
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-edit" disabled>
                          <i className="bi bi-pencil-square"></i>
                          Cancel(Not Available)
                        </button>
                      )}

                      <button
                        onClick={(e) => deleteTicketRes(e, item.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                      <ToastContainer />
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </center>
      </div>
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
