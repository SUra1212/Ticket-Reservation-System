import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../footer/Footer";

// Show all users data
const Alldata = (props) => (
  <tr>
    <td>{props.alldata.firstName}</td>
    <td>{props.alldata.lastName}</td>
    <td>{props.alldata.email}</td>
    <td>{props.alldata.nic}</td>
    <td>{props.alldata.gender}</td>
    {/* <td>{props.alldata.role}</td> */}
    <td>
      <a
        class="btn btn-edit"
        href={"/userdetailsedit/" + props.alldata.nic}
        style={{ color: "black", cursor:"pointer", textDecoration: "none" }}
        onClick={() => window.location.reload(true)}
      >
        Edit
      </a>{" "}
      &nbsp; &nbsp;
      <button
        class="btn btn-delete"
        style={{ color: "white", cursor:"pointer" }}
        onClick={() => {
          props.deleteAlldata(props.alldata.nic);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function UserDetails() {
  const [alldataa, setAllData] = useState([]);

  useEffect(() => {
    fetchData(JSON.parse(localStorage.getItem("user")).role);
  }, []);

  const fetchData = () => {
    axios
      .get("https://localhost:7227/api/user")
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAlldata = (nic) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`https://localhost:7227/api/User/userDelete/${nic}`)
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
          key={key}
        />
      );
    });
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("https://localhost:7227/api/User").then((response) => {
      const result = response.data.filter(
        (props) =>
          props.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          props.lastName.toLowerCase().includes(searchKey.toLowerCase()) ||
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
      <Header/>
      <br/><br/><br/>
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
        <form style={{ backgroundColor: "#ffff" }}>
          <table  className="table table-bordered table-white">
            <thead className="thead-light">
              <tr>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Email </th>
                <th> NIC </th>
                <th> Gender </th>
                {/* <th> Role </th> */}
                <th> Actions </th>
              </tr>
            </thead>
            <tbody> {alldataList()} </tbody>
          </table>
        </form>
        <br />
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>

    </div>
  );
}
