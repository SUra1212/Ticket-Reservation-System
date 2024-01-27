import React, { useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import "./popular.scss";
import Aos from "aos";
import ella from "../../assets/img/ella.jpg"
import kandy from "../../assets/img/kandy.jpg"
import polonnaruwa from "../../assets/img/Polonnaruwa.jpg"
import nuwaraeliya from "../../assets/img/nuwaraeliya.jpg"
import jaffna from "../../assets/img/jaffna.jpg"
import galle from "../../assets/img/galle.jpg"
import "aos/dist/aos.css";

//high order array method
const data = [
  {
    id: 1,
    imgSrc: ella,
    destTitle: "Ella",
    location: "Ella",
    grade: "Denuwara Menike",
  },
  {
    id: 2,
    imgSrc: kandy,
    destTitle: "Kandy",
    location: "Kandy",
    grade: "Senkadagala Menike",
  },
  {
    id: 3,
    imgSrc: polonnaruwa,
    destTitle: "Polonnaruwa",
    location: "Polonnaruwa",
    grade: "Udaya Devi",
  },
  {
    id: 4,
    imgSrc: nuwaraeliya,
    destTitle: "Nuwara Eliya",
    location: "Nuwara Eliya",
    grade: "Podi Menike",
  },
  {
    id: 5,
    imgSrc: jaffna,
    destTitle: "Jaffna",
    location: "Jaffna",
    grade: "Yal Devi",
  },
  {
    id: 6,
    imgSrc: galle,
    destTitle: "Galle",
    location: "Galle",
    grade: "Rajarata Rejini",
  },
];

const Popular = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="popular section container">
      <div className="secContainer">
        <div className="secHeader flex">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="textDiv"
          >
            <h2 className="secTitle">The Best Train Journeys </h2>
            <p>
              Exploring Sri Lanka's Scenic Routes: Unforgettable Train
              Adventures Await!
            </p>
          </div>
          {/* <div
            data-aos="fade-left"
            data-aos-duration="2500"
            className="iconsDiv flex"
          >
            <BsArrowLeftShort className="icon leftIcon" />
            <BsArrowRightShort className="icon" />
          </div> */}
        </div>
        <div className="mainContent grid">
          {data.map(({ id, imgSrc, destTitle, location, grade }) => {
            return (
              <div
                data-aos="fade-up"
                data-aos-duration="2500"
                className="singleDestination"
              >
                <div className="destImage">
                  <img src={imgSrc} alt="Image title" />
                  <div className="overlayInfo">
                    <h3>{destTitle}</h3>
                    <p>{location}</p>
                    <BsArrowRightShort className="icon" />
                  </div>
                </div>
                <div className="destFooter">
                  <div className="number">0{id}</div>
                  <div className="destText flex">
                    <h6>{location}</h6>
                    <span className="flex">
                      <span className="dot">
                        <BsDot className="icon" />
                      </span>
                      {grade}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Popular;
