import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
// import Offer from "./components/offers/Offer";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Blog from "./components/blog/Blog";
import Popular from "./components/popular/Popular";
import Header from "./components/Header";
import AllStudents from "./components/Student/AllStudents";
import AddStudent from "./components/Student/AddStudent";
import EditStudent from "./components/Student/EditStudent";
import ViewStudent from "./components/Student/ViewStudent";
import AddTicketRes from "./components/TicketRes/AddTicketRes";
import AllTicketRes from "./components/TicketRes/AllTicketRes";
import EditTicketRes from "./components/TicketRes/EditTicketRes";
import SearchShedule from "./components/TicketRes/SerachShedule";
import CancelTicketRes from "./components/TicketRes/CancelTicketRes";
import AllTrain from "./components/TrainManagement/AllTrains";
import CreateTrain from "./components/TrainManagement/CreateTrain";
import EditTrain from "./components/TrainManagement/EditTrain";
import ViewTrain from "./components/TrainManagement/ViewTrains";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header1 from "./components/dashboard/Header1";
import Sidebar from "./components/dashboard/SideBar";
import NewDashboard from "./components/dashboard/NewDashboard";
import { useState, useEffect } from 'react'
import Register1 from "./components/auth/Register1";
import UserDetails from "./components/dashboard/UserDetails";
import UserProfile from "./components/dashboard/UserProfile";
import UserDeatilsEdit from "./components/dashboard/UserDetailsEdit";
import UserReservation from "./components/TicketRes/UserReservation";
import EditUserReservation from "./components/TicketRes/EditUserResevation";
import CancelUserReservation from "./components/TicketRes/CancelUserReservation";
import AddTravellers from "./components/TicketRes/AddTravellers";
import AllTravllerDetails from "./components/TicketRes/AllTravellerDetails";
import EditUserDetails from "./components/TicketRes/EditUserDetails";
import ActiDeactiUsers from "./components/TrainManagement/ActiDeactiUsers";



function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  // const [role, setRole] = useState("");
  // const [nic, setNic] = useState("");

  // useEffect(() => {
  //   const val = JSON.parse(localStorage.getItem("user"));
  //   setRole(val.role);
  //   setNic(val.nic);
  // }, []);

  
  return (
    <Router>
      {/* Conditionally render the Header based on the route */}
  
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header/>
              <Home />
              <Popular />
              {/* <Offer /> */}
              <Blog />
              <About />
              <Footer/>
            </div>
          }
        />
        <Route path="/getAllStudents" element={<AllStudents />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/updateStudent/:id" element={<EditStudent />} />
        <Route path="/getStudent/:id" element={<ViewStudent />} />

        <Route path="/addticketres/:id" element={<AddTicketRes />} />
        <Route path="/allticketres" element={<AllTicketRes />} />
        <Route path="/editticketres/:id" element={<EditTicketRes />} />
        <Route path="/serachshedule" element={<SearchShedule />} />
        <Route path="/cancelticketres/:id" element={<CancelTicketRes />} />

        <Route path="/alltrain" element={<AllTrain />} />
        <Route path="/createtrain" element={<CreateTrain />} />
        <Route path="/edittrain/:id" element={<EditTrain />} />
        <Route path="/viewtrain/:id" element={<ViewTrain />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/register1" element={<Register1 />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
        <Route path="/userdetailsedit/:id" element={<UserDeatilsEdit />} />

        <Route path="/userreservation" element={<UserReservation />} />
        <Route path="/edituserreservation/:id" element={<EditUserReservation />} />
        <Route path="/canceluserreservation/:id" element={<CancelUserReservation />} />
        <Route path="/addtravellers" element={<AddTravellers />} />
        <Route path="/alltravellerdetails" element={<AllTravllerDetails />} />

        <Route path="/edituserdetails/:id" element={<EditUserDetails />} />
        <Route path="/actideactiusers" element={<ActiDeactiUsers />} />


        <Route path="/dashboard" element={
          <div className='grid-container'>
            <Header1 OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} setOpenSidebarToggle={setOpenSidebarToggle} />
            <NewDashboard />
          </div>
        }
        />
      </Routes>


    
    </Router>
  );
}

export default App;
