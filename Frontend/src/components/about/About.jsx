import React, { useEffect } from "react";
import "./about.scss";
import train from "../../assets/img/customer.png";
import mountain from "../../assets/img/mountains.png";
import passengers from "../../assets/img/hiking.png";
import video from "../../assets/about.mp4";
import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="about section">
      <div className="secContainer">
        <div className="title">Why TicketTraverse?</div>
        <div className="mainContent container grid">
          <div
            data-aos="fade-up"
            data-aos-duration="2500"
            className="singleItem"
          >
            <img src={train} alt="" />
            <h3>350+ Trains</h3>
            <p>
              Sri Lanka Railway operates approximately 396 trains which include
              67 Long-Distance and 16 Intercity trains
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="singleItem"
          >
            <img src={mountain} alt="" />
            <h3>100+ Destinations</h3>
            <p>
              For many reasons, Sri Lanka can easily claim to have some of the
              world's best train trips.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="singleItem"
          >
            <img src={passengers} alt="" />
            <h3>3000000+ Passengers</h3>
            <p>
              In Sri Lanka, the service provided by SLR in carrying the daily
              commuters to their workplaces, is inevitable. Carries about 3.72
              Million passengers daily.
            </p>
          </div>
        </div>
        <div className="videoCard container">
          <div className="cardContent grid">
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="cardText"
            >
              <h2>
                Rails Through Paradise: A Journey into Sri Lanka's Enchanting
                Landscapes!
              </h2>
              <p>
                Embark on a scenic adventure where lush greenery and serene
                vistas greet you at every turn. Experience nature's wisdom,
                healing embrace, and soothing solace on Sri Lanka's picturesque
                train rides.
              </p>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="cardVideo"
            >
              <video src={video} autoPlay loop muted type="video/mp4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
