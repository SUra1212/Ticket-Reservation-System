import React, { useEffect, useState } from "react";
//import "./AMDashboard.css"
import "../../../css/DahBoard.css";
import Admin2 from "../../../images/All.jpg";
import Details from "../../../images/logo512.png";
import Report from "../../../images/logo512.png";
import new_user from "../../../images/UserManagement.jpg";
import background from "../../../images/background2.jpeg";
import { useHistory } from "react-router-dom";

// Dashboard
export default function DashBoard() {
  const [role, setRole] = useState("");
  const [nic, setNic] = useState("");

  let history = useHistory();

  useEffect(() => {
    const val = JSON.parse(localStorage.getItem("user"));
    setRole(val.role);
    setNic(val.nic);
  }, []);

  const LogOut = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div
      className ={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <br />
      <div className="col-md-8 mt-4 mx-auto">
        <div className="text-center">
          <h1 className="text-primary">
            <font face="Comic sans MS" size=" 6">
              {role} Dashboard
            </font>
          </h1>
        </div>

        <form className="needs-validation" noValidate>
          <br />
          <div className="container">
            <div className="row hidden-md-up">
              {role === "BackOffice" ? (
                <div className="row hidden-md-up">
                  {/* 01 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={new_user}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href="/register"
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>Add a new User</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 02 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={Admin2}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href="/user-details"
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>Details of all Users</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 03 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={Details}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href={`/profile/${nic}`}
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>{role} Profile</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container" style={{ marginTop: "15px" }}>
                    <div className="row hidden-md-up">
                      {/* 04 */}
                      <div className="col-md-4">
                        <div className="card-container">
                          <div
                            className="card text-center"
                            style={{ backgroundColor: "#F9FAFC" }}
                          >
                            <div className="card-block">
                              <br />
                              <img
                                style={{ height: 130, width: 180 }}
                                className="rounded-circle"
                                src={Report}
                                alt="Card image cap"
                              />
                              <h4 className="card-title"></h4>
                              <button
                                type="button"
                                className="btn btn-light btn-lg"
                              >
                                <a
                                href="#"
                                  onClick={LogOut}
                                  style={{
                                    textDecoration: "none",
                                    color: "Info",
                                  }}
                                >
                                  {" "}
                                  <h4>Logout Button</h4>{" "}
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                //Travel Agent

                <div className="row hidden-md-up">
                  {/* 01 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={new_user}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href="/register"
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>Add a new User</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 02 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={Admin2}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href="/user-details"
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>Details of all Users</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 03 */}
                  <div className="col-md-4">
                    <div className="card-container">
                      <div
                        className="card text-center"
                        style={{ backgroundColor: "#F9FAFC" }}
                      >
                        <div className="card-block">
                          <br />
                          <img
                            style={{ height: 130, width: 180 }}
                            className="rounded-circle"
                            src={Details}
                            alt="Card image cap"
                          />
                          <h4 className="card-title"></h4>
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            <a
                              href={`/profile/${nic}`}
                              style={{ textDecoration: "none", color: "Info" }}
                            >
                              {" "}
                              <h4>{role} Profile</h4>{" "}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container" style={{ marginTop: "15px" }}>
                    <div className="row hidden-md-up">
                      {/* 04 */}
                      <div className="col-md-4">
                        <div className="card-container">
                          <div
                            className="card text-center"
                            style={{ backgroundColor: "#F9FAFC" }}
                          >
                            <div className="card-block">
                              <br />
                              <img
                                style={{ height: 130, width: 180 }}
                                className="rounded-circle"
                                src={Report}
                                alt="Card image cap"
                              />
                              <h4 className="card-title"></h4>
                              <button
                                type="button"
                                className="btn btn-light btn-lg"
                              >
                                <a
                                  href="#"
                                  style={{
                                    textDecoration: "none",
                                    color: "Info",
                                  }}
                                >
                                  {" "}
                                  <h4>Name</h4>{" "}
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <br /> <br />
        </form>
      </div>{" "}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
