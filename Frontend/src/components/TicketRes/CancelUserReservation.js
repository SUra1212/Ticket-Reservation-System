import React, { useEffect, useState } from "react";
import {
    MDBInput,
} from 'mdb-react-ui-kit';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CancelUserReservation() {

    let { id } = useParams();

    const navigate = useNavigate();
    // const [setInputErrorList] = useState({})
    const [ticketres, setTicketRes] = useState({

    })

      const notifyCancelRes = () => {
        toast.success("Train Schedule Status changed Successfully!", {
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

        axios.get(`https://localhost:7227/reservation/${id}`).then(res => {
            console.log(res)
            setTicketRes(res.data)
        })
    }, [id])

    const handleInput = (e) => {
        e.persist();
        setTicketRes({ ...ticketres, [e.target.name]: e.target.value })

        const name = e.target.name;
        const value = e.target.value;

        const updatedTicketRes = Object.assign({}, ticketres, { [name]: value });
        setTicketRes(updatedTicketRes);


    }

    const UpdateTicketRes = (e) => {
        e.preventDefault();
        const data = {
            id: ticketres.id,
            firstName: ticketres.firstName,
            lastName: ticketres.lastName,
            email: ticketres.email,
            nic: ticketres.nic,
            dateRes: ticketres.dateRes,
            mobileNo: ticketres.mobileNo,
            noOfPassenger: ticketres.noOfPassenger,
            class: ticketres.class,
            total: ticketres.total,
            status: ticketres.status

        }
        axios.put(`https://localhost:7227/update/${id}`, data)
            .then(res => {
                console.log(res)
                notifyCancelRes();
                setTimeout(() => {
                  navigate("/userreservation"); // Navigate after 2 seconds
                }, 2000);
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error("Error in changing the Train Reservation Status!", {
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
            })
    }

    return (
        <div>
            <Header/>
        <br /><br /><br /><br /><br />
        <div className="page-container">
            <form onSubmit={UpdateTicketRes} className='container card ticket-res-card'>
                <br />
                <center>
                    <h3>Cancel Reservation </h3>
                </center>
                <br />
                <label>NIC</label>
                <MDBInput disabled={true} name="nic" value={ticketres.nic} onChange={handleInput} wrapperClass='mb-4' id='form6Example4' />
                <label>Date</label>
                <MDBInput disabled={true} type="date" min={new Date().toISOString().split("T")[0]} name="date" value={ticketres.dateRes} onChange={handleInput} wrapperClass='mb-4' id='form6Example4' />
                <label>Phone Number</label>
                <MDBInput disabled={true} name="mobileNo" value={ticketres.mobileNo} onChange={handleInput} wrapperClass='mb-4' type='tel' id='form6Example6' />
                <label>Class</label>
                <select
                    name="class"
                    disabled={true}
                    value={ticketres.class}
                    onChange={handleInput}
                    className="form-select">
                    <option value="">Select Class</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <br></br>
                <label>No Of Passengers</label>
                <MDBInput disabled={true} name="noOfPassenger" value={ticketres.noOfPassenger} onChange={handleInput} wrapperClass='mb-4' type='number' id='form6Example6' />
                <label>Total Amount</label>
                <MDBInput  disabled={true} name="total" value={ticketres.total} onChange={handleInput} wrapperClass='mb-4' type='number' id='form6Example6' />
                <label>Status</label>
                <select
                    name="status"
                    value={ticketres.status}
                    onChange={handleInput}
                    className="form-select">
                    <option value="">Select Option</option>
                    <option value="Accept">Accept</option>
                    <option value="Cancel">Cancel</option>
                </select>
                <br></br>
                {/* <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' /> */}
                {/* 
            <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form6Example8'
                label='Create an account?'
                defaultChecked
            /> */}

                <button
                    type="submit"
                    className="btn btn-primary">
                    Cancel
                </button>
                <ToastContainer/>
                <br />
            </form>
        </div>
        <br/><br/><br/>
        <Footer/>
    </div>
    );
}