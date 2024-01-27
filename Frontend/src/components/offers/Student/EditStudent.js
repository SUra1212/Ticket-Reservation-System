import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditStudent = () => {

    let {id} = useParams();

    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({

        })

        useEffect(() => {

            axios.get(`https://localhost:7227/api/Student/${id}`).then(res => {
               console.log(res)
               setStudent(res.data)
            })
          }, [id])

        const handleInput = (e) => {
            e.persist();
            setStudent({...student, [e.target.name]: e.target.value})
        }

        const UpdateStudent = (e) => {
            e.preventDefault();
            const data = {
            id: student.id,
            name: student.name,
            gender: student.gender,
            age: student.age

             }
             axios.put(`https://localhost:7227/api/Student/${id}`, data)
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
      <h1 className="display-4 text-center">Edit Students</h1>
      <hr />
      <form onSubmit={UpdateStudent} >
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
          Update
        </button>
        <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default EditStudent;

