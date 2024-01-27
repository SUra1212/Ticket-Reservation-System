import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer/Footer";


export default function SearchTrainRes() {
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [date, setDate] = useState("");
    const [ticketres, setTicketRes] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [noResultsAlert, setNoResultsAlert] = useState(false);
    const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);

    useEffect(() => {
        axios.get(`https://localhost:7227/api/TrainRes`).then((res) => {
            console.log(res);
            setTicketRes(res.data);
        });
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fromLocation || !toLocation || !date) {
            setEmptyFieldsAlert(true);
            return;
        }

        // Filter the results based on the search criteria
        const filteredResults = ticketres.filter((item) => {
            return (
                item.fromLocation === fromLocation &&
                item.toLocation === toLocation &&
                item.date === date
            );
        });

        setSearchResults(filteredResults);

        if (filteredResults.length === 0) {
            setNoResultsAlert(true);
        } else {
            setNoResultsAlert(false);
        }

        setEmptyFieldsAlert(false);
    };

    return (
        <div >
            <Header/>
            <br /><br /><br /><br /><br /><br /><br />
            <div className="card container">
                <br />
                <center>
                    <h3>Search Your Train</h3>
                    <br />
                </center>
                <form onSubmit={handleSubmit}>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <label>From Location</label>
                            <select
                                className="form-select"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            >
                                <option value="">Select From Location</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Mount-Lavinia">Mount-Lavinia</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Badulla">Badulla</option>
                                <option value="Nanu Oya">Nanu Oya</option>
                                <option value="Kankasanthurai">Kankasanthurai</option>
                                <option value="Batticaloa">Batticaloa</option>
                                <option value="Beliatta">Beliatta</option>
                                <option value="Vavuniya">Vavuniya</option>
                                <option value="Maradana">Maradana</option>
                                <option value="Matara">Matara</option>
                                <option value="Panadura">Panadura</option>
                                <option value="Chilaw">Chilaw</option>
                                <option value="Galle">Galle</option>
                                <option value="Maradhana">Maradhana</option>
                                {/* Add more options as needed */}
                            </select>
                        </MDBCol>
                        <MDBCol>
                            <label>To Location</label>
                            <select
                                className="form-select"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                            >
                                <option value="">Select From Location</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Mount-Lavinia">Mount-Lavinia</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Badulla">Badulla</option>
                                <option value="Nanu Oya">Nanu Oya</option>
                                <option value="Kankasanthurai">Kankasanthurai</option>
                                <option value="Batticaloa">Batticaloa</option>
                                <option value="Beliatta">Beliatta</option>
                                <option value="Vavuniya">Vavuniya</option>
                                <option value="Maradana">Maradana</option>
                                <option value="Matara">Matara</option>
                                <option value="Panadura">Panadura</option>
                                <option value="Chilaw">Chilaw</option>
                                <option value="Galle">Galle</option>
                                <option value="Maradhana">Maradhana</option>
                                {/* Add more options as needed */}
                            </select>
                        </MDBCol>
                        <MDBCol>
                            <label>Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} // Set min to current date
                            />
                        </MDBCol>
                    </MDBRow>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary">
                            Search
                        </button>
                    </div>
                    <br />
                </form>
                {/* Display alert if no results found */}
                <div className="alert-container">
                    {noResultsAlert && (
                        <div className="alert alert-danger" role="alert">
                            No schedules found for the specified criteria.
                        </div>
                    )}
                    {emptyFieldsAlert && (
                        <div className="alert alert-danger" role="alert">
                            Please fill in all fields.
                        </div>
                    )}
                </div>
            </div>
            {/* Display search results here */}
            {searchResults.length > 0 && (
                <div className="container">
                    <br />
                    <h2>Train Schedules</h2>
                    <div className="result-container">
                        {searchResults.map((result, index) => (
                            <div key={index} className="result-item">
                                {/* Display relevant data from the search results */}
                                <span className="result-heading">From:</span> {result.fromLocation}<br />
                                <span className="result-heading">To:</span> {result.toLocation}<br />
                                <span className="result-heading">Departure Time:</span> {result.departureTime}<br />
                                <span className="result-heading">Arrival Time:</span> {result.arrivalTime}<br />
                                <span className="result-heading">Train Name:</span> {result.trainName}<br />
                                <span className="result-heading">Date:</span> <span className="date-info">{result.date}</span><br />
                                <span className="result-heading">1st Class: Rs.</span>{" "}
                                <span className="class-info">
                                    {result.firstClass} {/* Format to two decimal places */}
                                </span>
                                <br />
                                <span className="result-heading">2nd Class: Rs.</span>{" "}
                                <span className="class-info">
                                    {result.secondClass} {/* Format to two decimal places */}
                                </span>
                                <br />
                                <span className="result-heading">3rd Class: Rs.</span>{" "}
                                <span className="class-info">
                                    {result.thirdClass} {/* Format to two decimal places */}
                                </span>
                                <br />
                                <br />
                                <Link to={`/addticketres/${result.id}`}>
                                    <button className="btn btn-addStudent">Book Now</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            )}
            <br /><br /><br /><br /><br />
            <Footer/>
        </div>
    );
}
