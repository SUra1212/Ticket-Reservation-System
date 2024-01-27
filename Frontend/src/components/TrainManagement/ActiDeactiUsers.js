import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import {  MDBCol } from "mdb-react-ui-kit";

// Show all users data
const Alldata = (props) => (
  <tr>
    <td>{props.alldata.firstName}</td>
    <td>{props.alldata.lastname}</td>
    <td>{props.alldata.email}</td>
    <td>{props.alldata.nic}</td>
    <td>{props.alldata.gender}</td>
    <td>{props.alldata.status === 'Inactive' ? 'Deactivate' : 'Active'}</td>
    {/* <td>{props.alldata.role}</td> */}
    <td>
      {/* <a
        class="btn btn-edit"
        href={"/edituserdetails/" + props.alldata.nic}
        style={{ color: "black", cursor: "pointer", textDecoration: "none" }}
        onClick={() => window.location.reload(true)}
      >
        Edit
      </a>{" "} */}
      &nbsp; &nbsp;
      <button
        class="btn btn-delete"
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          props.deleteAlldata(props.alldata.nic);
        }}
      >
        Deactivate
      </button>
      &nbsp; &nbsp;
      <button
        class="btn btn-edit"
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          props.deleteAlldata1(props.alldata.nic);
        }}
      >
        Activate
      </button>
      &nbsp; &nbsp;
      {/* <button
        class="btn btn-delete"
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => {
          props.deleteAlldata2(props.alldata.nic);
        }}
      >
        Delete
      </button> */}
    </td>
  </tr>
);

export default function ActiDeactiUsers() {
  const [alldataa, setAllData] = useState([]);

  useEffect(() => {
    fetchData(JSON.parse(localStorage.getItem("user")).role);
  }, []);

  const fetchData = () => {
    axios
      .get("https://localhost:7227/userMobile")
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAlldata = (nic) => {
    if (window.confirm("Are you sure to Deactivate this account?")) {
      axios
        .delete(`https://localhost:7227/api/userMobile/delete/${nic}`)
        .then((response) => {
          console.log(response.data);
          fetchData(); // Refresh data after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };


  const deleteAlldata1 = (nic) => {
    if (window.confirm("Are you sure to Activate this account?")) {
      axios
        .delete(`https://localhost:7227/api/userMobile/activateUser/${nic}`)
        .then((response) => {
          console.log(response.data);
          fetchData(); // Refresh data after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const deleteAlldata2 = (nic) => {
    if (window.confirm("Are you sure delete this account?")) {
      axios
        .delete(`https://localhost:7227/api/userMobile/removeUser/${nic}`)
        .then((response) => {
          console.log(response.data);
          fetchData(); // Refresh data after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const alldataList = () => {
    return alldataa.map((currentalldata, key) => {
      return (
        <Alldata
          alldata={currentalldata}
          deleteAlldata={deleteAlldata}
          deleteAlldata1={deleteAlldata1}
          deleteAlldata2={deleteAlldata2}
          key={key}
        />
      );
    });
  };

  // const deleteTicketRes = (e, id) => {
  //   e.preventDefault();

  //   const shouldDelete = window.confirm(
  //     "Are you sure you want to delete this item?"
  //   );

  //   if (shouldDelete) {
  //     const thisClicked = e.currentTarget;
  //     axios
  //       .delete(`https://localhost:7227/api/TicketRes/${id}`)
  //       .then((res) => {
  //         console.log(res);
  //         toast.success("Train Reservation deleted successfully!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //         thisClicked.closest("tr").remove();
  //       })
  //       .catch(function (error) {
  //         if (error.response) {
  //           toast.error("Failed to delete Train Reservation!", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "colored",
  //           });
  //         }
  //       });
  //   }
  // };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("https://localhost:7227/userMobile").then((response) => {
      const result = response.data.filter(
        (props) =>
          props.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          props.lastname.toLowerCase().includes(searchKey.toLowerCase()) ||
          props.nic.toLowerCase().includes(searchKey.toLowerCase()) ||
          props.email.toLowerCase().includes(searchKey.toLowerCase())
      );
      setAllData(result);
    });
  };


  return (
    <div
    // style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <Header />
      <br /><br /><br />
      <div
        style={{ marginLeft: "50px", marginRight: "50px", marginTop: "0px" }}
      >
        <br />
        <div className="row">
          {/* <h1 className="text-center"> Details of all Users </h1> */}
        </div>
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2"></div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={(e) => handleSearchArea(e)}
            ></input>
          </div>
        </div>
        <br />
        <MDBCol style={{marginLeft: '91%'}}>
      <Link to={"/dashboard"}>
          <button  className="btn btn-success">
            Dashboard
          </button>
        </Link>
      </MDBCol>
      <br/>
        <form style={{ backgroundColor: "#ffff" }}>
          <table className="table table-bordered table-white">
            <thead className="thead-light">
              <tr>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Email </th>
                <th> NIC </th>
                <th> Gender </th>
                <th> Status </th>
                {/* <th> Role </th> */}
                <th> Actions </th>
              </tr>
            </thead>
            <tbody> {alldataList()} </tbody>
          </table>
        </form>
        <br />
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />

    </div>
  );
}
