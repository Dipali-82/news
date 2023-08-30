import React from "react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import moment from "moment/moment";
import { newsUpdate } from "../../redux/news/NewsSlice";

function FeaturePost() {
  const {
    travellingNewsOne,
    foodNewsOne,
    healthNewsOne,
    latestNewsFive,
    sliderNews,
  } = useSelector((store) => store.news);
  const dispatch = useDispatch();
  const viewCount = (e, news) => {
    const formData = {
      newsid: news._id,
      _id: news._id,
      numberofViews: Number(news.numberofViews) + 1,
    };
    dispatch(newsUpdate(formData));
  };
  return (
    <>
      {/* Featured Post Area Start */}
      <section className="utf_featured_post_area pt-4 no-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 pad-r mb-1">
              <Swiper
                draggable={true}
                spaceBetween={10}
                modules={[Autoplay]}
                // loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
              >
                {sliderNews.map((news) => (
                  <SwiperSlide>
                    <div
                      id="utf_featured_slider"
                      className="utf_featured_slider"
                    >
                      <div className="item">
                        <Link
                          to={`/news-post-info/${news.slugUrl}`}
                          onClick={(e) => viewCount(e, news)}
                        >
                          <img src={news.thumbnail} style={{ width: "100%" }} />
                        </Link>
                        <div className="utf_featured_post">
                          <div className="utf_post_content">
                            {/* <a className="utf_post_cat">{news.category}</a> */}
                            <h2 className="utf_post_title title-extra-large">
                              <Link
                                to={`/news-post-info/${news.slugUrl}`}
                                onClick={(e) => viewCount(e, news)}
                              >
                                <a>{news.newsTitle}</a>
                              </Link>
                            </h2>
                            {/* <span className="utf_post_author">
                              <i className="fa fa-user" />
                              <a>{news.reporterName}</a>
                            </span> */}
                            {/* <span className="utf_post_date">
                              <i className="fa fa-clock-o" />{" "}
                              {moment(news.createdAt).format("MMM DD, YYYY")}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="col-lg-5 col-md-12 pad-l">
              <div className="row">
                <div className="col-md-12">
                  {healthNewsOne.map((news) => (
                    <div
                      className="utf_post_overaly_style contentTop hot-post-top clearfix"
                      key={news._id}
                    >
                      <Link
                        to={`/news-post-info/${news.slugUrl}`}
                        onClick={(e) => viewCount(e, news)}
                      >
                        <div className="utf_post_thumb">
                          <a>
                            <img
                              className="img-fluid"
                              src={news.thumbnail}
                              alt
                            />
                          </a>
                        </div>
                      </Link>
                      <div className="utf_post_content">
                        {/* <a className="utf_post_cat">{news.category}</a> */}
                        <h2 className="utf_post_title title-large">
                          <Link
                            to={`/news-post-info/${news.slugUrl}`}
                            onClick={(e) => viewCount(e, news)}
                          >
                            <a>{news.newsTitle}</a>
                          </Link>
                        </h2>
                        {/* <span className="utf_post_author">
                          <i className="fa fa-user" />{" "}
                          <a>{news.reporterName}</a>
                        </span>
                        <span className="utf_post_date">
                          <i className="fa fa-clock-o" />{" "}
                          {moment(news.createdAt).format("MMM DD, YYYY")}
                        </span> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 pad-r-small">
                  {foodNewsOne.map((news) => (
                    <div
                      className="utf_post_overaly_style contentTop utf_hot_post_bottom clearfix"
                      key={news._id}
                    >
                      <div className="utf_post_thumb">
                        <a>
                          <img className="img-fluid" src={news.thumbnail} alt />
                        </a>
                      </div>
                      <div className="utf_post_content">
                        {/* <a className="utf_post_cat">{news.category}</a> */}
                        <h2 className="utf_post_title title-medium">
                          <Link
                            to={`/news-post-info/${news.slugUrl}`}
                            onClick={(e) => viewCount(e, news)}
                          >
                            <a>{news.newsTitle.slice(0, 40) + "..."}</a>
                          </Link>
                        </h2>
                        {/* <div className="utf_post_meta">
                          <span className="utf_post_author">
                            <i className="fa fa-user" />{" "}
                            <a>{news.reporterName}</a>
                          </span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 pad-l-small">
                  {foodNewsOne.map((news) => (
                    <div
                      className="utf_post_overaly_style contentTop utf_hot_post_bottom clearfix"
                      key={news._id}
                    >
                      <div className="utf_post_thumb">
                        <a>
                          <img className="img-fluid" src={news.thumbnail} alt />
                        </a>
                      </div>
                      <div className="utf_post_content">
                        {/* <a className="utf_post_cat">{news.category}</a> */}
                        <h2 className="utf_post_title title-medium">
                          <Link
                            to={`/news-post-info/${news.slugUrl}`}
                            onClick={(e) => viewCount(e, news)}
                          >
                            <a>{news.newsTitle.slice(0, 40) + "..."}</a>
                          </Link>
                        </h2>
                        {/* <div className="utf_post_meta">
                          <span className="utf_post_author">
                            <i className="fa fa-user" />{" "}
                            <a>{news.reporterName}</a>
                          </span>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Post Area End */}
    </>
  );
}

export default FeaturePost;
