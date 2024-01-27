import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import './dashboard.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";



function NewDashboard() {

    const [role, setRole] = useState("");
    const [nic, setNic] = useState("");
    const [ticketres, setTicketRes] = useState([]);
    const [dataCount, setDataCount] = useState(0); // Initialize dataCount with 0
    const [dataCount1, setDataCount1] = useState(0); // Initialize dataCount with 0
    const [dataCount2, setDataCount2] = useState(0); // Initialize dataCount with 0
    const [trainRes, setTrainRes] = useState([]);
    const [todayScheduleCount, setTodayScheduleCount] = useState(0);
    const [todayScheduleCount1, setTodayScheduleCount1] = useState(0);
    const [data1, setData] = useState([]); // Declare data here once
    const [data11, setData1] = useState([]); // Declare data here once
    const [todayDate, setTodayDate] = useState('');

    const [currentTime, setCurrentTime] = useState('');

    const dateStyle = {
        color: 'red',
        fontSize: '20px',
    };

    useEffect(() => {
        // Function to update the current time
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            setCurrentTime(formattedTime);
        };

        // Update the current time immediately
        updateTime();

        // Set up an interval to update the time every second (1000 milliseconds)
        const timeInterval = setInterval(updateTime, 1000);

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    useEffect(() => {
        // Get today's date as a string in the format "YYYY-MM-DD"
        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today);
    }, []);

    useEffect(() => {
        fetchDataAndCount();
    }, []);

    const fetchDataAndCount = () => {
        axios
            .get("https://localhost:7227/api/TrainRes")
            .then((res) => {
                setData(res.data);

                const today = new Date();
                const todaySchedules = res.data.filter((schedule) => {
                    const scheduleDate = new Date(schedule.date);
                    return (
                        scheduleDate.getDate() === today.getDate() &&
                        scheduleDate.getMonth() === today.getMonth() &&
                        scheduleDate.getFullYear() === today.getFullYear()
                    );
                });

                const count = todaySchedules.length;
                console.log(`Today's Schedule Count: ${count}`);
                setTodayScheduleCount(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchDataAndCount1();
    }, []);

    const fetchDataAndCount1 = () => {
        axios
            .get("https://localhost:7227/api/TrainRes")
            .then((res) => {
                console.log(res);
                setTrainRes(res.data);

                // Get the count of data
                const count = res.data.length;
                console.log(`Total data count: ${count}`);
                setDataCount2(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchDataCount();
    }, []);

    const fetchDataCount = () => {
        axios
            .get("https://localhost:7227/userMobile")
            .then((response) => {
                const count = response.data.length; // Get the count of data
                console.log(`Total data count: ${count}`);
                setDataCount1(count); // Update dataCount with the count from the API
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchDataAndCount3();
    }, []);

    const fetchDataAndCount3 = () => {
        axios
            .get("https://localhost:7227/api/TicketRes")
            .then((res) => {
                setData1(res.data);

                const today = new Date();
                const todaySchedules = res.data.filter((schedule) => {
                    const scheduleDate = new Date(schedule.dateRes);
                    return (
                        scheduleDate.getDate() === today.getDate() &&
                        scheduleDate.getMonth() === today.getMonth() &&
                        scheduleDate.getFullYear() === today.getFullYear()
                    );
                });

                const count = todaySchedules.length;
                console.log(`Today's ticket Count: ${count}`);
                setTodayScheduleCount1(count);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    useEffect(() => {
        // Get today's date as a string in the format "YYYY-MM-DD"
        const today = new Date().toISOString().split('T')[0];
        setTodayDate(today);
    }, []);



    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7227/api/TicketRes`)
            .then((res) => {
                const count = res.data.length;
                console.log(`Total data count: ${count}`);
                setDataCount(count); // Update dataCount with the count from the API
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const val = JSON.parse(localStorage.getItem("user"));
        setRole(val.role);
        setNic(val.nic);
    }, []);

    const LogOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    const data = [
        {
            name: ' A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: ' B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: ' C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: ' D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: ' E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: ' F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: ' G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];



    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3> {role} DASHBOARD</h3>
            </div>
            <div>
                <div style={dateStyle}>{todayDate}</div>
                <div style={dateStyle}>{currentTime}</div>
            </div>


            {role === "BackOffice" ? (
                <div>
                    <div className='main-cards'>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>All Shedule</h3>
                            </div>
                            <h1>{dataCount2}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>Today Shedule</h3>
                            </div>
                            <h1>{todayScheduleCount}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>Today Reservation</h3>
                            </div>
                            <h1>{todayScheduleCount1}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>ALERTS</h3>
                            </div>
                            <h1>42</h1>
                        </div>
                    </div>

                    <div className='charts'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>

                </div>
            ) : (
                <div>
                    <div className='main-cards'>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>Users</h3>
                            </div>
                            <h1>{dataCount1}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>Reservation</h3>
                            </div>
                            <h1>{dataCount}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>Today Shedule</h3>
                            </div>
                            <h1>{todayScheduleCount}</h1>
                        </div>
                        <div className='card2'>
                            <div className='card2-inner'>
                                <h3>ALERTS</h3>
                            </div>
                            <h1>42</h1>
                        </div>
                    </div>

                    <div className='charts'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>

                </div>
            )}
        </main>
    )
}

export default NewDashboard