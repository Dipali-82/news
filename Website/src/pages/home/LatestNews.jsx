import React from "react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import { useNavigate, Link } from "react-router-dom";
import { newsUpdate } from "../../redux/news/NewsSlice";

function LatestNews() {
  const { latestNews } = useSelector((store) => store.news);
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
      {/* Latest News Area Start */}

      <section className="utf_latest_new_area pb-bottom-20">
        <div className="container">
          <div className="utf_latest_news block color-red">
            <h3 className="utf_block_title">
              <span>Latest News</span>
            </h3>
            {/* <div
              id="utf_latest_news_slide"
              className="owl-carousel owl-theme utf_latest_news_slide"
            >
            </div> */}

            <div
              id="utf_latest_news_slide"
              className=" owl-carousel owl-theme utf_latest_news_slide owl-loaded "
            >
              <div className="item">
                <ul className="utf_list_post d-flex flex-wrap">
                  {latestNews.map((news) => (
                    <li
                      className="clearfix col-lg-3 col-md-4 col-sm-6 my-1"
                      key={news._id}
                    >
                      <div className="utf_post_block_style clearfix">
                        <Link
                          to={`/news-post-info/${news.slugUrl}`}
                          onClick={(e) => viewCount(e, news)}
                        >
                          <div
                            className="utf_post_thumb"
                            style={{ position: "relative" }}
                          >
                            <a style={{ cursor: "pointer" }}>
                              <img
                                className="img-fluid"
                                src={news.thumbnail}
                                alt
                              />
                            </a>
                            <img
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 3,
                                height: "60px",
                                width: "100px",
                              }}
                              src="assets/images/transpimg.png"
                              alt
                            />
                          </div>
                        </Link>
                        {/* <a
                          className="utf_post_cat"
                          style={{ cursor: "pointer" }}
                        >
                          {news.category}
                        </a> */}
                        <div className="utf_post_content">
                          <h2
                            className="utf_post_title title-medium"
                            style={{ cursor: "pointer" }}
                          >
                            <Link
                              to={`/news-post-info/${news.slugUrl}`}
                              onClick={(e) => viewCount(e, news)}
                            >
                              <a>{news.newsTitle}</a>
                            </Link>
                          </h2>
                          {/* <div className="utf_post_meta">
                            <span className="utf_post_author">
                              <i className="fa fa-user" />
                              <a style={{ cursor: "pointer" }}>
                                {news.reporterName}
                              </a>
                            </span>
                            <span className="utf_post_date">
                              <i className="fa fa-clock-o" />
                              {moment(news.createdAt).format("MMM DD, YYYY")}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest News Area End */}
    </>
  );
}

export default LatestNews;
