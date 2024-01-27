import React, { useEffect } from "react";
import './blog.scss'
import { BsArrowRightShort } from "react-icons/bs";
import blog1 from "../../assets/img/blog1.jpg";
import blog2 from "../../assets/img/blog2.jpg";
import blog3 from "../../assets/img/blog3.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const post = [
  {
    id: 1,
    postImage: blog1,
    title: "Kandy to Ella Train: An Unforgettable Experience in Sri Lanka",
    desc: "The Kandy to Ella train ride is the most beautiful train ride in Sri Lanka, if not in the world! Board the train and experience breathtaking views of lush green tea plantations, mountains, viaducts, valleys, and dense jungle. What’s more, it’s the perfect way to experience Sri Lankan life. ",
    link: "https://www.saltinourhair.com/sri-lanka/kandy-ella-train/",
  },
  {
    id: 2,
    postImage: blog2,
    title: "Ella Odyssey Train Sri Lanka",
    desc: " Ella Odyssey, a new luxury train service from Kandy to Ella has started 5th March 2022. Ella Odyssey train will operate daily leaving Kandy at 7 AM and reaching Demodara at 2.20 PM, and leaving Demodara at 3.40 PM. and reaching Kandy at 9.45 PM. This is very important initiative by Sri Lanka Rail Way Department which greatly help for the development of Sri Lanka Tourism. ",
    link: "https://www.ceylonexpeditions.com/travel-blog/ella-odyssey-train-sri-lanka",
  },
  {
    id: 3,
    postImage: blog3,
    title: "The World`s Most Beautiful Train Trip?",
    desc: "The train trip from Ella to Kandy in Sri Lanka, or the other way around, is considered to be one of the most beautiful train trips in the world. This train ride is seven hours long and takes you through stunning landscapes of green and lush tea plantations and mountain views.",
    link: "https://nerdnomads.com/sri-lanka-train-travel-ella-kandy",
  },
];

const Blog = () => {
    useEffect(() => {
      Aos.init({ duration: 2000 });
    }, []);
  return (
    <section className="blog container section">
      <div className="secContainer">
        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle">
            Our Blogs?
          </h2>
          <p data-aos="fade-up" data-aos-duration="2500">
            Discover a World of Insightful Articles, Tips, and Stories in Our
            Blogs!
          </p>
        </div>

        <div className="mainContainer grid">
          {post.map(({ id, postImage, title, desc, link }) => {
            return (
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                className="singlePost grid"
              >
                <div className="imgDiv">
                  <img src={postImage} />
                </div>
                <div className="postDetails">
                  <h3 data-aos="fade-up" data-aos-duration="3000">
                    {title}{" "}
                  </h3>
                  <p data-aos="fade-up" data-aos-duration="4000">
                    {desc}
                  </p>
                </div>
                <a
                  data-aos="fade-up"
                  data-aos-duration="4500"
                  href={link}
                  className="flex"
                >
                  Read More
                  <BsArrowRightShort className="icon" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
