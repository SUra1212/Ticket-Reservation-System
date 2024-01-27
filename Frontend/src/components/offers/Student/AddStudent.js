import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {
  
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({
        name: '',
        gender: '',
        age: ''
        })

        const handleInput = (e) => {
            e.persist();
            setStudent({...student, [e.target.name]: e.target.value})
        }

        const saveStudent = (e) => {
            e.preventDefault();
            const data = {

            name: student.name,
            gender: student.gender,
            age: student.age

             }
             axios.post(`https://localhost:7227/api/Student`, data)
             .then(res => {
                console.log(res)
                navigate('/getAllStudents')
                // alert(res.data.message);
             })
             .catch(function (error) {
                if(error.response){
                    if(error.response.status == 422){
                        setInputErrorList(error.responce.data.errors)
                    }
                    if(error.response.status == 500){
                        alert(error.response.data)
                    }
                }
             })
        }

  return (
    <div className="container">
      <h1 className="display-4 text-center">Add Students</h1>
      <hr />
      <form onSubmit={saveStudent} >
        <div className="card">
        <div className=" container form-group">
          <label>Student name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter student's name"
            value={student.name}
            onChange={handleInput}
          />
          <span className="text-danger">{inputErrorList.name}</span>
        </div>
        <div className="container form-group">
          <label>Student Gender</label>
          <input
            type="text"
            className="form-control"
            name="gender"
            placeholder="Enter student's gender"
            value={student.gender}
            onChange={handleInput}
          />
          <span className="text-danger">{inputErrorList.gender}</span>
        </div>
        <div className="container form-group">
          <label>Student Age</label>
          <input
            type="text"
            className="form-control"
            name="age"
            placeholder="Enter student's age"
            value={student.age}
            onChange={handleInput}
          />
          <span className="text-danger">{inputErrorList.age}</span>
        </div>
        <br/>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
