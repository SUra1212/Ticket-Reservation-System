// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";


// export const ViewStudent = () => {
//      const [student, setStudent] = useState({
//        name: "",
//        age: 0,
//        gender: "",
//      });

//      const { id } = useParams();
//     //  const navigate = useNavigate();

//      useEffect(() => {
//        getSingleStudent();
//      }, [id]);

//      const getSingleStudent = () => {
//        axios
//          .get(`http://localhost:8070/student/getStudent/${id}`)
//          .then((res) => {
//             console.log(res)
//            setStudent({
//              name: res.data.student.name,
//              age: res.data.student.age,
//              gender: res.data.student.gender,
//            });
//          })
//          .catch((err) => {
//            console.log("Error from UpdateBookInfo");
//            console.log(err);
//          });
//      };
// const StudentItem = (
//     <div>
//       <table className='table table-hover table-light'>
//         <tbody>
//           <tr>
//             <th scope='row'>1</th>
//             <td>Name</td>
//             <td>{student.name}</td>
//           </tr>
//           <tr>
//             <th scope='row'>2</th>
//             <td>Age</td>
//             <td>{student.age}</td>
//           </tr>
//           <tr>
//             <th scope='row'>3</th>
//             <td>Gender</td>
//             <td>{student.gender}</td>
//           </tr>
        
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="ShowBookDetails">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-10 m-auto">
//             <br /> <br />
//             <Link
//               to="/getAllStudents"
//               className="btn btn-outline-warning float-left"
//             >
//               Show All Student List
//             </Link>
//           </div>
//           <br />
//           <div className="col-md-8 m-auto">
//             <h1 className="display-4 text-center">Student's Record</h1>
//             <p className="lead text-center">View Student's Info</p>
//             <hr /> <br />
//           </div>
//           <div className="col-md-10 m-auto">{StudentItem}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewStudent;