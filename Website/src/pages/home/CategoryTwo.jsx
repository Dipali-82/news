import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment/moment";
import { useNavigate, Link } from "react-router-dom";
import { newsUpdate } from "../../redux/news/NewsSlice";

function CategoryTwo() {
  const {
    travellingNewsThree,
    healthNewsThree,
    foodNewsThree,
    travellingNewsOne,
    foodNewsOne,
    healthNewsOne,
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
      {/* 2rd Block Wrapper Start */}
      <section className="utf_block_wrapper p-bottom-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="block color-dark-blue">
                <h3 className="utf_block_title">
                  <span>Travel News</span>
                </h3>
                {travellingNewsOne.map((news) => (
                  <div
                    className="utf_post_overaly_style clearfix"
                    key={news._id}
                  >
                    <div className="utf_post_thumb">
                      <a>
                        <img className="img-fluid" src={news.thumbnail} alt />
                      </a>
                    </div>
                    <div className="utf_post_content">
                      <h2
                        className="utf_post_title"
                        style={{ cursor: "pointer" }}
                      >
                        <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                          <a>{news.newsTitle}</a>
                        </Link>
                      </h2>
                      {/* <div className="utf_post_meta">
                        <span className="utf_post_author">
                          <i className="fa fa-user" />{" "}
                          <a style={{ cursor: "pointer" }}>
                            {news.reporterName}
                          </a>
                        </span>
                        <span className="utf_post_date">
                          <i className="fa fa-clock-o" /> 25 Jan, 2022
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}

                <div className="utf_list_post_block">
                  <ul className="utf_list_post">
                    {travellingNewsThree.map((news) => (
                      <li className="clearfix" key={news._id}>
                        <div className="utf_post_block_style post-float clearfix">
                          <div className="utf_post_thumb">
                            <a>
                              <img
                                className="img-fluid"
                                src={news.thumbnail}
                                alt
                                style={{ cursor: "pointer" }}
                              />
                            </a>
                          </div>
                          <div className="utf_post_content">
                            <h2 className="utf_post_title title-small">
                              <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                                <a style={{ cursor: "pointer" }}>
                                  {news.newsTitle}
                                </a>
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
                                <i className="fa fa-clock-o" />{" "}
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
            <div className="col-lg-4">
              <div className="block color-aqua">
                <h3 className="utf_block_title">
                  <span>Lifestyle News</span>
                </h3>
                {foodNewsOne.map((news) => (
                  <div
                    className="utf_post_overaly_style clearfix"
                    key={news._id}
                  >
                    <div className="utf_post_thumb">
                      <a>
                        <img className="img-fluid" src={news.thumbnail} alt />
                      </a>
                    </div>
                    <div className="utf_post_content">
                      <h2
                        className="utf_post_title"
                        style={{ cursor: "pointer" }}
                      >
                        <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                          <a>{news.newsTitle}</a>
                        </Link>
                      </h2>
                      {/* <div className="utf_post_meta">
                        <span className="utf_post_author">
                          <i className="fa fa-user" />{" "}
                          <a style={{ cursor: "pointer" }}>
                            {news.reporterName}
                          </a>
                        </span>
                        <span className="utf_post_date">
                          <i className="fa fa-clock-o" /> 25 Jan, 2022
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
                <div className="utf_list_post_block">
                  <ul className="utf_list_post">
                    {foodNewsThree.map((news) => (
                      <li className="clearfix" key={news._id}>
                        <div className="utf_post_block_style post-float clearfix">
                          <div className="utf_post_thumb">
                            <a>
                              <img
                                className="img-fluid"
                                src={news.thumbnail}
                                alt
                                style={{ cursor: "pointer" }}
                              />
                            </a>
                          </div>
                          <div className="utf_post_content">
                            <h2 className="utf_post_title title-small">
                              <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                                <a style={{ cursor: "pointer" }}>
                                  {news.newsTitle}
                                </a>
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
                                <i className="fa fa-clock-o" />{" "}
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
            <div className="col-lg-4">
              <div className="block color-violet">
                <h3 className="utf_block_title">
                  <span>Health News</span>
                </h3>
                {healthNewsOne.map((news) => (
                  <div
                    className="utf_post_overaly_style clearfix"
                    key={news._id}
                  >
                    <div className="utf_post_thumb">
                      <a>
                        <img className="img-fluid" src={news.thumbnail} alt />
                      </a>
                    </div>
                    <div className="utf_post_content">
                      <h2
                        className="utf_post_title"
                        style={{ cursor: "pointer" }}
                      >
                        <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                          <a>{news.newsTitle}</a>
                        </Link>
                      </h2>
                      {/* <div className="utf_post_meta">
                        <span className="utf_post_author">
                          <i className="fa fa-user" />{" "}
                          <a style={{ cursor: "pointer" }}>
                            {news.reporterName}
                          </a>
                        </span>
                        <span className="utf_post_date">
                          <i className="fa fa-clock-o" /> 25 Jan, 2022
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
                <div className="utf_list_post_block">
                  <ul className="utf_list_post">
                    {healthNewsThree.map((news) => (
                      <li className="clearfix" key={news._id}>
                        <div className="utf_post_block_style post-float clearfix">
                          <div className="utf_post_thumb">
                            <a>
                              <img
                                className="img-fluid"
                                src={news.thumbnail}
                                alt
                                style={{ cursor: "pointer" }}
                              />
                            </a>
                          </div>
                          <div className="utf_post_content">
                            <h2 className="utf_post_title title-small">
                              <Link to={`/news-post-info/${news.slugUrl}`} onClick={(e) => viewCount(e, news)}>
                                <a style={{ cursor: "pointer" }}>
                                  {news.newsTitle}
                                </a>
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
                                <i className="fa fa-clock-o" />{" "}
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
        </div>
      </section>
      {/* 2rd Block Wrapper End */}
    </>
  );
}

export default CategoryTwo;
