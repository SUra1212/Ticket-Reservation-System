import React, { useEffect } from "react";
import "./home.css";
import "./home.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import video from "../../assets/train.mp4";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="home">
      <div className="video-container">
        <video autoPlay loop muted className="video-bg">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="secContainer container">
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
            Book your trip with TicketTraverse
          </h1>
          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
            Travel to your favorite city with us! Explore, Book, and Embark with TicketTraverse
          </p>
          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="#">Explore Now</a>
          </button>
        </div>
        <div className="homeCard grid">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="locationDiv"
          >
            <label
              htmlFor="location"
              style={{
                display: "block",
                color: "var(--textColor)",
                fontWeight: "bold",
                paddingBottom: ".4rem",
              }}
            >
              Location
            </label>
            <input
              type="text"
              placeholder="Dream destination"
              style={{
                width: "100%",
                background: "var(--inputColor)",
                borderRadius: "10px",
                border: "none",
                padding: "10px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="distDiv"
          >
            <label
              htmlFor="distance"
              style={{
                display: "block",
                color: "var(--textColor)",
                fontWeight: "bold",
                paddingBottom: ".4rem",
              }}
            >
              Duration
            </label>
            <input
              type="text"
              placeholder="km/Meters"
              style={{
                width: "100%",
                background: "var(--inputColor)",
                borderRadius: "10px",
                border: "none",
                padding: "10px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="3000"
            className="priceDiv"
          >
            <label
              htmlFor="price"
              style={{
                display: "block",
                color: "var(--textColor)",
                fontWeight: "bold",
                paddingBottom: ".4rem",
              }}
            >
              Price
            </label>
            <input
              type="text"
              placeholder="Rs.10,000 - Rs.20,000"
              style={{
                width: "100%",
                background: "var(--inputColor)",
                borderRadius: "10px",
                border: "none",
                padding: "10px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            />
          </div>
          <button data-aos="fade-left" data-aos-duration="2000" className="btn">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
