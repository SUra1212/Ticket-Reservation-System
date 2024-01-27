import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'
import './dashboard.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BiLogOut } from 'react-icons/bi';

function Header1({ OpenSidebar }) {

  // const [role, setRole] = useState("");
  // const [nic, setNic] = useState("");

  let navigate = useNavigate();

  // // useEffect(() => {
  // //   const val = JSON.parse(localStorage.getItem("user"));
  // //   setRole(val.role);
  // //   setNic(val.nic);
  // // }, []);

  const LogOut = () => {
        navigate("/");
  };

  const Profile = () =>{
     navigate("/userprofile")
  }

  return (
    <header className='header1'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        &nbsp;&nbsp;
        <BsFillEnvelopeFill className='icon' />
        &nbsp;&nbsp;
        <BsPersonCircle  className='icon' />

        <BiLogOut onClick={LogOut} className='icon' />
      </div>
    </header>
  )
}

export default Header1