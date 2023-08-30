import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const MobileCategory = () => {
  const { allCategorys } = useSelector((store) => store.category);
  return (
    <>
      <div className="col-sm-12 col-md-12" style={{ padding: 0, margin: 0 }}>
        <div
          className="col-sm-6 col-md-6 catmaincontain"
          style={{ padding: 0, margin: 0 }}
        >
          {/* <div className="catmbContain">
            <div className="catdiv">
              <Link to={`/`}>
                <img src="" alt="cat-img" />
                <h6 className="imagename">Home</h6>
              </Link>
            </div>
          </div> */}

          {allCategorys &&
            allCategorys.map((category, index) => (
              <div className="catmbContain" key={category._id}>
                <div className="catdiv">
                  <Link to={`/category/${category.slugUrl}`}>
                    <img src={category.thumbnail} alt="cat-img" />
                    <h6 className="imagename">{category.name}</h6>
                  </Link>
                </div>
              </div>
            ))}
          <div className="catmbContain">
            <div className="catdiv">
              <Link to="/about-us">
                <img src="assets/images/aboutus.jpeg" alt="cat-img" />
                <h6 className="imagename">About Us</h6>
              </Link>
            </div>
          </div>
          <div className="catmbContain">
            <div className="catdiv">
              <Link to="/contact-us">
                <img src="assets/images/contactus.jpeg" alt="cat-img" />
                <h6 className="imagename">Contact Us</h6>
              </Link>
            </div>
          </div>
          <div className="catmbContain">
            <div className="catdiv">
              <Link to="/YoutubeVideos">
                <img src="assets/images/contactus.jpeg" alt="cat-img" />
                <h6 className="imagename">Videos</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileCategory;
