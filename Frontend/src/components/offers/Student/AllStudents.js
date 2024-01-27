import "./students.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    axios.get(`https://localhost:7227/api/Student`).then(res => {
       console.log(res)
       setStudents(res.data)
    })
  }, [])

  const deleteStudent = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;

    axios.delete(`https://localhost:7227/api/Student/${id}`)
    .then(res => {

      console.log(res)
      thisClicked.closet("tr").remove();

    })
    .catch(function (error){
      if(error.response){

      }
    })
  }

  return (
    <div className="container">
      <h1 className="display-4 text-center">All Students</h1>
      <h4 className="display-8 text-center">Student Info</h4>
      <hr />
      <div className="card">
        <div className="card-title"></div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th style={{ textAlign: "center" }}>Id</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Gender</th>
                <th style={{ textAlign: "center" }}>Age</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students && 
              students.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index+ 1}</th>
                    <th>{item.name}</th>
                    <th>{item.gender}</th>
                    <th>{item.age}</th>
                    <td>
                        <Link to={`/updateStudent/${item.id}`} >
                          <button className="btn btn-edit">
                            <i className="bi bi-pencil-square"></i>
                            Edit
                          </button>
                        </Link>
                        <button onClick={(e) => deleteStudent(e, item.id)}
                          className="btn btn-delete"                       
                        >
                          Delete
                        </button>
                        <Link >
                          <button  className="btn btn-view">View</button>
                        </Link>
                      </td>
                  </tr>
                  
                )
              })}
                
                 
            </tbody>
          </table>
          <Link to={"/addStudent"}>
            <button className="btn btn-addStudent">Add Student</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllStudents;
