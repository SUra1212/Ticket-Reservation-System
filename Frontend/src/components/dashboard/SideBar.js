import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsFillGearFill
}
    from 'react-icons/bs'
import './dashboard.css'
import { IoMdTrain, IoIosAddCircle, IoMdHome} from "react-icons/io";
import { ImProfile  } from "react-icons/im";

function Sidebar({ openSidebarToggle, OpenSidebar }) {


    const [role, setRole] = useState("");
    const [nic, setNic] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const val = JSON.parse(localStorage.getItem("user"));
        setRole(val.role);
        setNic(val.nic);
    }, []);

    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    };



    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <IoMdTrain className='icon logo' /> TICKETTRAVERSE
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            {role === "BackOffice" ? (
                <ul className='sidebar-list'>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsGrid1X2Fill className='icon' /> Dashboard
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href={`/userprofile/${nic}`}>
                            <ImProfile className='icon' /> Profile
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/createtrain">
                            <IoMdTrain className='icon' /> Create Train Shedule
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/alltrain">
                            <BsFillGrid3X3GapFill className='icon' /> All Train Shedule
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/actideactiusers">
                            <BsPeopleFill className='icon' /> All Traveller Details
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/">
                            <IoMdHome className='icon' /> Home
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsFillGearFill className='icon' /> Setting
                        </a>
                    </li>
                </ul>
            ) : (
                <ul className='sidebar-list'>
                    <li className='sidebar-list-item'>
                        <a href="/dashboard">
                            <BsGrid1X2Fill className='icon' /> Dashboard
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href={`/userprofile/${nic}`}>
                            <ImProfile className='icon' /> Profile
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/serachshedule">
                            <IoIosAddCircle className='icon' /> Add Reservation
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/allticketres">
                            <BsFillGrid3X3GapFill className='icon' /> Reservations
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/userreservation">
                            <BsFillGrid3X3GapFill className='icon' />User Reservations
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/addtravellers">
                            <BsPeopleFill className='icon' /> Add Travellers
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/alltravellerdetails">
                            <BsPeopleFill className='icon' /> All Traveller Details
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="/">
                            <IoMdHome className='icon' /> Home
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsFillGearFill className='icon' /> Setting
                        </a>
                    </li>                   
                </ul>
            )}
        </aside>
    )
}

export default Sidebar