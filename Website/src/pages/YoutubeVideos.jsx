import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment/moment";
import { newsUpdate } from "../redux/news/NewsSlice";
import { Helmet } from "react-helmet";

function YoutubeVideos() {
  const { allCategorys } = useSelector((store) => store.category);
  const { subcategorytotal } = useSelector((store) => store.subCategory);
  const { newsTotal, latestFourNews } = useSelector((store) => store.news);
  const [categroy, setCategroy] = useState("");
  const [subcategroy, setSubCategroy] = useState([]);
  const [newsByCat, setNewsByCat] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  const viewCount = (e, news) => {
    const formData = {
      newsid: news._id,
      _id: news._id,
      numberofViews: Number(news.numberofViews) + 1,
    };
    dispatch(newsUpdate(formData));
  };

  //   useEffect(() => {
  //     const catUrl = params.catslugurl;
  //     if (catUrl) {
  //       const singleCategory = allCategorys.find(
  //         (categ) => categ.slugUrl === catUrl
  //       );
  //       setCategroy(singleCategory);
  //       const subcategories = subcategorytotal.filter(
  //         (subcat) => subcat.categoryId === singleCategory._id
  //       );
  //       setSubCategroy(subcategories);
  //       const catbyNews = newsTotal.filter(
  //         (news) => news.categoryId === singleCategory._id
  //       );
  //       setNewsByCat(catbyNews);
  //     }
  //   }, [params.catslugurl, allCategorys, subcategorytotal, newsTotal]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {`Alikidi.com - youtube`} </title>
        <meta name="description" content="react_helmet demo by manoj" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Page Title Start */}
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ul className="breadcrumb">
                <li>
                  <Link to="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link>
                    <a>Category</a>
                  </Link>
                </li>
                <li style={{ textTransform: "capitalize", fontWeight: "751" }}>
                  youtube
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Page title end */}

      {/* 1rd Block Wrapper Start */}
      <section className="utf_block_wrapper">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-8 col-md-12 d-flex flex-wrap"
            //   style={{ margin: 0, padding: 0 }}
            >
              <div className="col-lg-6 col-md-6 col-sm-12">
                {newsTotal
                  //   .hasOwnProperty("newsVideoYouTubeLink")
                  .map((videos, index) => (
                    <>
                      {videos.hasOwnProperty("newsVideoYouTubeLink") &&
                      videos.newsVideoYouTubeLink != "" ? (
                        <>
                          <iframe
                            key={index}
                            width="660"
                            height="439"
                            className="youtubeiframe"
                            src={videos.newsVideoYouTubeLink}
                            // className="img-fluid"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="sidebar utf_sidebar_right">
                <div className="widget">
                  <h3 className="utf_block_title">
                    <span>Follow Us</span>
                  </h3>
                  <ul className="social-icon">
                    {/* <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-rss" />
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="https://www.facebook.com/profile.php?id=100092603236788"
                        target="_blank"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/alikidinews" target="_blank">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="mailto:alikidinews@gmail.com" target="_blank">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-vimeo-square" />
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="https://www.youtube.com/@alikidinews"
                        target="_blank"
                      >
                        <i className="fa fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/alikidinews?igshid=ZGUzMzM3NWJiOQ=="
                        target="_blank"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="widget color-default">
                  <h3 className="utf_block_title">
                    <span>Popular News</span>
                  </h3>
                  <div className="utf_list_post_block">
                    <ul className="utf_list_post">
                      {latestFourNews.map((news) => (
                        <li className="clearfix">
                          <div className="utf_post_block_style post-float clearfix">
                            <div className="utf_post_thumb">
                              <a>
                                <img
                                  className="img-fluid"
                                  src={news.thumbnail}
                                  alt
                                />
                              </a>
                              <a className="utf_post_cat">{news.category}</a>
                            </div>
                            <div className="utf_post_content">
                              <h2 className="utf_post_title title-small">
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
                                  <a>{news.reporterName}</a>
                                </span>
                                <span className="utf_post_date">
                                  <i className="fa fa-clock-o" />{" "}
                                  {moment(news.createdAt).format(
                                    "MMM DD, YYYY"
                                  )}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="widget text-center">
                  <img
                    className="banner img-fluid"
                    src="images/banner-ads/ad-sidebar.png"
                    alt
                  />
                </div>
                <div className="widget m-bottom-0">
                  <h3 className="utf_block_title">
                    <span>Newsletter</span>
                  </h3>
                  <div className="utf_newsletter_block">
                    <div className="utf_newsletter_introtext">
                      <h4>Subscribe Newsletter!</h4>
                      {/* <p>
                        Lorem ipsum dolor sit consectetur adipiscing elit
                        Maecenas in pulvinar neque Nulla finibus lobortis
                        pulvinar.
                      </p> */}
                    </div>
                    <div className="utf_newsletter_form">
                      {/* <form action="#" method="post"> */}
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="utf_newsletter_form-email"
                          className="form-control form-control-lg"
                          placeholder="E-Mail Address"
                          autoComplete="off"
                        />
                        <button className="btn btn-primary">Subscribe</button>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 1rd Block Wrapper End */}
    </>
  );
}

export default YoutubeVideos;
