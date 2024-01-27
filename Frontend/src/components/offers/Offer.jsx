import React, { useEffect } from "react";
import "./offer.scss";
import { MdKingBed } from "react-icons/md";
import { GiBathtub } from "react-icons/gi";
import { AiOutlineWifi } from "react-icons/ai";
import { MdAirportShuttle } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

import hotel1 from "../../assets/img/hotel1.jpg";
import hotel2 from "../../assets/img/hotel2.jpg";
import hotel3 from "../../assets/img/hotel3.jpg";
import hotel4 from "../../assets/img/hotel4.jpg";
import hotel5 from "../../assets/img/hotel5.jpg";
import hotel6 from "../../assets/img/hotel6.jpg";

import Aos from "aos";
import "aos/dist/aos.css";


const offer = [
  {
    id: 1,
    imgSrc: hotel2,
    destTitle: "Sydney Opera House",
    location: "Australia",
    price: "Rs.23,000",
    beds: "2 Beds",
    deal: "30% off",
  },
  {
    id: 2,
    imgSrc: hotel3,
    destTitle: "Egyptian pyramids",
    location: "Egypt",
    price: "Rs.30,000",
    beds: "1 double bed",
    deal: "20% off",
  },
  {
    id: 3,
    imgSrc: hotel4,
    destTitle: "Eiffel Tower",
    location: "France",
    price: "Rs.18,000",
    beds: "1 large double bed",
    deal: "25% off",
  },
  {
    id: 4,
    imgSrc: hotel1,
    destTitle: "Venice",
    location: "Italy",
    price: "Rs.20,000",
    beds: "2 Beds",
    deal: "10% off",
  },
  {
    id: 5,
    imgSrc: hotel5,
    destTitle: "Maldives",
    location: "Maldives",
    price: "Rs.25,000",
    beds: "1 extra-large double bed",
    deal: "35% off",
  },
  {
    id: 6,
    imgSrc: hotel6,
    destTitle: "Big Ben",
    location: "London",
    price: "Rs.38,000",
    beds: "1 large double bed ",
    deal: "20% off",
  },
];

const Offer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="offer container section">
      <div className="secContainer">
        <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
          <div className="secTitle">
            <h2>Special offers</h2>
            <p>
              From historical to natural spectecualrs, come see the best of the
              world!
            </p>
          </div>
          <div className="mainContent grid">
            {offer.map(({ id, imgSrc, beds, location, price, deal }) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  className="singleOffer"
                >
                  <div className="destImage">
                    <img src={imgSrc} alt="destination image" />
                    <span className="discount">{deal}</span>
                  </div>
                  <div className="offerBody">
                    <div className="price flex">
                      <h4>{price}</h4>
                      <span className="status">For Rent</span>
                    </div>
                    <div className="amenities flex">
                      <div className="singleAmenity flex">
                        <MdKingBed className="icon" />
                        <small>{beds}</small>
                      </div>
                      <div className="singleAmenity flex">
                        <GiBathtub className="icon" />
                        <small>Private bathroom</small>
                      </div>
                      <div className="singleAmenity flex">
                        <AiOutlineWifi className="icon" />
                        <small>Free WiFi</small>
                      </div>
                      <div className="singleAmenity flex">
                        <MdAirportShuttle className="icon" />
                        <small>Shuttle</small>
                      </div>
                    </div>
                    <div className="location flex">
                      <MdLocationPin className="icon" />
                      <small>{location}</small>
                    </div>
                    <button className="btn flex">
                      View Details
                      <BsArrowRightShort className="icon" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
