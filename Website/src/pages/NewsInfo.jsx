import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment/moment";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { newsUpdate, updateNewsComment } from "../redux/news/NewsSlice";
import { Baseurl } from "../config/BaseUrl";
import axios from "axios";
import { Helmet } from "react-helmet";

function NewsInfo() {
  const { newsTotal, latestFourNews, latestNews, newsLoading } = useSelector(
    (store) => store.news
  );
  const { universalTags } = useSelector((store) => store.universaltag);
  const { loginData } = useSelector((store) => store.auth);

  const [newsSingle, setNewsSingle] = useState("");
  const [newsSlider, setNewsSlider] = useState([]);
  const [errorMassage, setErrorMassage] = useState("");
  const [whatsappMassage, setWhatsappMassage] = useState("");
  const [whatsappMas, setWhatsappMas] = useState("");
  // console.log(newsSingle, "newsSingle");

  const [name, setName] = useState(loginData.name);
  const [email, setEmail] = useState(loginData.email);
  const [mobile, setMobile] = useState(loginData.mobile);
  const [shareShow, setShareShow] = useState(false);
  const [comment, setComment] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [commentArray, setCommentArray] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  const viewCount = (e, news) => {
    const formData = {
      newsid: news._id,
      _id: news._id,
      numberofViews: Number(news.numberofViews),
    };
    dispatch(newsUpdate(formData));
  };

  useEffect(() => {
    const newsUrl = params.newsslugurl;

    if (newsUrl && !newsLoading) {
      const singleeNews = newsTotal.find((news) => news.slugUrl === newsUrl);
      const fetchData = async () => {
        const newssingle = await axios.get(
          `${Baseurl}/api/v1/news/findbyid/${singleeNews._id}`
        );

        if (newssingle.data.success === true) {
          const singleNews = newssingle.data.news;
          let ulrWhatsappShare = `https://api.whatsapp.com/send/?text=https://alikidi.com/news-post-info/${params.newsslugurl}`;
          setWhatsappMassage(ulrWhatsappShare);
          setNewsSingle(singleNews);
          if (singleNews.slider.length > 0) {
            setNewsSlider(singleNews.slider);
          }
          setCommentArray(singleNews.review);
          setYoutubeLink(singleNews.newsVideoYouTubeLink);
          setTwitterLink(singleNews.newsVideoTwitterLink);
          setWhatsappMas(singleNews.newsVideoYouTubeLink);
        }
      };
      fetchData();
    }
  }, [params.newsslugurl, newsTotal]);

  const submit = async (e) => {
    e.preventDefault();
    if (loginData.isAuth === true) {
      try {
        const formData = {
          userName: name,
          userEmail: email,
          newsComment: comment,
          newsId: newsSingle._id,
        };

        const config = {
          Headers: { "Content-Type": "application/json" },
        };
        try {
          const addComment = await axios.put(
            `${Baseurl}/api/v1/news/newscomment`,
            formData,
            config
          );
          if (addComment.data.success) {
            setComment("");
            const updatednews = addComment.data.news;
            dispatch(updateNewsComment(updatednews));
            setNewsSingle(updatednews);
            setNewsSlider(updatednews.slider);
            setCommentArray([...newsSingle.review, formData]);
          }
        } catch (error) {}
      } catch (error) {}
    } else {
      setErrorMassage("please login first");
    }
  };

  return (
    <>
      <Helmet>
        <title> {`${newsSingle.newsTitle}`} </title>
        <meta property="og:image" content={newsSlider[0]} />
        <meta property="og:title" content={newsSingle.newsTitle} />
        <meta
          property="og:url"
          content={`https://alikidi.com/${params.newsslugurl}`}
        />
        <link
          rel="canonical"
          href={`https://alikidi.com/${params.newsslugurl}`}
        ></link>
        <meta property="og:description" content={newsSingle.newsContent} />
        <meta name="description" content={newsSingle.newsContent} />

        <link rel="icon" href={newsSlider[0]} />
        <link rel="apple-touch-icon" href={newsSlider[0]} />
        <link rel="shortcut icon" type="image/ico" href={newsSlider[0]} />
        <link rel="fluid-icon" type="image/png" href={newsSlider[0]} />
      </Helmet>

      {/* Page Title Start */}
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li>
                  <a>Home</a>
                </li>
                <li>News Post Info</li>
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
            <div className="col-lg-8 col-md-12">
              <div className="single-post">
                <div className="utf_post_title-area">
                  <a className="utf_post_cat">{newsSingle.category}</a>
                  <h2 className="utf_post_title">{newsSingle.newsTitle}</h2>
                  <div className="utf_post_meta">
                    {/* <span className="utf_post_author">
                      <img src={newsSingle.avatar} alt="image" />
                    </span> */}
                    <span className="utf_post_author">
                      By <a>{newsSingle.reporterName}</a>
                    </span>
                    {newsSingle.hasOwnProperty("district") ? (
                      <>
                        <span className="utf_post_author">
                          ,<a>{newsSingle.district}</a>
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    {newsSingle.hasOwnProperty("mandal") ? (
                      <>
                        <span className="utf_post_author">
                          ,<a>{newsSingle.mandal}</a>
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <span className="utf_post_date">
                      <i className="fa fa-clock-o" />
                      {moment(newsSingle.createdAt).format("MMM DD, YYYY")}
                    </span>
                    <span className="post-hits">
                      <i className="fa fa-eye" /> {newsSingle.numberofViews}
                    </span>
                    <span className="post-comment">
                      <i className="fa fa-comments-o" />
                      <a className="comments-link">
                        <span>{commentArray.length}</span>
                      </a>
                    </span>
                    <span className="utf_post_author">www.alikidi.com</span>
                  </div>
                </div>
                <div className="utf_post_content-area">
                  <div className="share-items clearfix">
                    <ul className="post-social-icons unstyled">
                      <li
                        className="alishare"
                        onClick={() => setShareShow(!shareShow)}
                        style={{ cursor: "pointer" }}
                      >
                        <a>
                          <i className="fa fa-share-alt" />
                          <span className="ts-social-title">Share</span>
                        </a>
                      </li>

                      {shareShow === true ? (
                        <>
                          <li className="whatsup">
                            <a href={`${whatsappMassage}`} target="_blank">
                              <i className="fa fa-whatsapp" />
                              <span className="ts-social-title">
                                what's app
                              </span>
                            </a>
                          </li>
                          <li className="facebook">
                            <a
                              href="https://www.facebook.com/profile.php?id=100092603236788"
                              target="_blank"
                            >
                              <i className="fa fa-facebook" />
                              <span className="ts-social-title">Facebook</span>
                            </a>
                          </li>
                          <li className="gplus">
                            <a
                              href="https://instagram.com/alikidinews?igshid=ZGUzMzM3NWJiOQ=="
                              target="_blank"
                            >
                              <i className="fa fa-instagram" />
                              <span className="ts-social-title">Instagram</span>
                            </a>
                          </li>
                          <li className="pinterest">
                            <a
                              href="https://www.youtube.com/@alikidinews"
                              target="_blank"
                            >
                              <i className="fa fa-youtube" />
                              <span className="ts-social-title">Youtube</span>
                            </a>
                          </li>
                          <li className="twitter">
                            <a
                              href="https://twitter.com/alikidinews"
                              target="_blank"
                            >
                              <i className="fa fa-twitter" />
                              <span className="ts-social-title">Twitter</span>
                            </a>
                          </li>
                          {/* <li className="gplus">
                        <a href="mailto:alikidinews@gmail.com" target="_blank">
                          <i className="fa fa-google-plus" />
                          <span className="ts-social-title">Google +</span>
                        </a>
                      </li> */}
                        </>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  <Swiper
                    grabCursor={true}
                    navigation={false}
                    pagination={true}
                    mousewheel={false}
                    keyboard={true}
                    modules={[
                      Navigation,
                      Pagination,
                      Mousewheel,
                      Keyboard,
                      Autoplay,
                    ]}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    className="homeSlider mt-2"
                  >
                    {newsSlider.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="post-media post-featured-image">
                          <a className="gallery-popup">
                            <img src={image} className="img-fluid" alt="" />
                          </a>
                          <div className="smallbannerSec">
                            <div className="Secheading w-75">
                              <p className="text-left pl-3">
                                {newsSingle.newsTitle}
                              </p>
                            </div>
                            <div className="d-flex w-25 bottomcontainerimg">
                              <div>
                                <img
                                  src="/assets/images/favlogobanner.png"
                                  className="img-fluid news-images"
                                  alt="invalid"
                                />
                              </div>
                              <div className="pl-2 mobile">
                                <p className="alikidiheading">AlikidiNews</p>
                                <p className="indiaread">#IndiaAlikidiNews</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="row">
                    {/* {newsSingle.hasOwnProperty("newsVideoYouTubeLink") ? (
                      <>
                        <div className="col-md-6">
                          <div className="utf_post_block_style my-2">
                            <a>
                              <iframe
                                width="360"
                                height="239"
                                src={newsSingle.newsVideoYouTubeLink}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                              ></iframe>
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )} */}

                    {newsSingle.hasOwnProperty("newsVideoYouTubeLink") &&
                    newsSingle.newsVideoYouTubeLink != "" ? (
                      <>
                        <div className="col-md-6">
                          <div className="utf_post_block_style my-2">
                            <a>
                              <iframe
                                width="360"
                                height="239"
                                src={newsSingle.newsVideoYouTubeLink}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                              ></iframe>
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {newsSingle.hasOwnProperty("newsVideoTwitterLink") ? (
                      <></>
                    ) : (
                      <>
                        {newsSingle.hasOwnProperty("newsVideoYouTubeLink") &&
                        newsSingle.newsVideoYouTubeLink != "" ? (
                          <>
                            <div className="col-md-6">
                              <div className="utf_post_block_style my-2">
                                <a>
                                  <iframe
                                    width="360"
                                    height="239"
                                    src={newsSingle.newsVideoYouTubeLink}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                  ></iframe>
                                </a>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>

                  <div className="entry-content">
                    <p style={{ textAlign: "justify" }}>
                      {newsSingle.newsContent}
                    </p>

                    {/* <blockquote style={{ textAlign: "justify" }}>
                      {newsSingle.newsMainContent}
                    </blockquote> */}

                    {/* <ul className="list-round mr_bottom-20">
                      <li>Lorem Ipsum is simply dummy text of the printing.</li>
                      <li>Lorem Ipsum is simply dummy text of the printing.</li>
                      <li>Lorem Ipsum is simply dummy text of the printing.</li>
                      <li>Lorem Ipsum is simply dummy text of the printing.</li>
                    </ul> */}
                  </div>

                  {/* <div className="tags-area clearfix">
                    <div className="post-tags">
                      <span>Tags:</span>
                      {universalTags.map((tag) => (
                        <a key={tag._id} style={{ cursor: "pointer" }}>
                          # {tag.name}
                        </a>
                      ))}
                    </div>
                  </div> */}
                  <div className="share-items clearfix">
                    <ul className="post-social-icons unstyled">
                      <li
                        className="alishare"
                        onClick={() => setShareShow(!shareShow)}
                        style={{ cursor: "pointer" }}
                      >
                        <a>
                          <i className="fa fa-share-alt" />
                          <span className="ts-social-title">Share</span>
                        </a>
                      </li>

                      {shareShow === true ? (
                        <>
                          <li className="whatsup">
                            <a href={`${whatsappMassage}`} target="_blank">
                              <i className="fa fa-whatsapp" />
                              <span className="ts-social-title">
                                what's app
                              </span>
                            </a>
                          </li>
                          <li className="facebook">
                            <a
                              href="https://www.facebook.com/profile.php?id=100092603236788"
                              target="_blank"
                            >
                              <i className="fa fa-facebook" />
                              <span className="ts-social-title">Facebook</span>
                            </a>
                          </li>
                          <li className="gplus">
                            <a
                              href="https://instagram.com/alikidinews?igshid=ZGUzMzM3NWJiOQ=="
                              target="_blank"
                            >
                              <i className="fa fa-instagram" />
                              <span className="ts-social-title">Instagram</span>
                            </a>
                          </li>
                          <li className="pinterest">
                            <a
                              href="https://www.youtube.com/@alikidinews"
                              target="_blank"
                            >
                              <i className="fa fa-youtube" />
                              <span className="ts-social-title">Youtube</span>
                            </a>
                          </li>
                          <li className="twitter">
                            <a
                              href="https://twitter.com/alikidinews"
                              target="_blank"
                            >
                              <i className="fa fa-twitter" />
                              <span className="ts-social-title">Twitter</span>
                            </a>
                          </li>
                          {/* <li className="gplus">
                        <a href="mailto:alikidinews@gmail.com" target="_blank">
                          <i className="fa fa-google-plus" />
                          <span className="ts-social-title">Google +</span>
                        </a>
                      </li> */}
                        </>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* <nav className="post-navigation clearfix">
              
                href={`https://web.whatsapp.com/send?text= https://alikidi.com/#/news-post-info/${params.newsslugurl}`}
                 href={`https://api.whatsapp.com/send?text=alikidi.com${whatsappMassage}${params.newsslugurl}`}
                <div className="post-previous">
                  <a>
                    <span>
                      <i className="fa fa-angle-left" />
                      Previous Post
                    </span>
                    <h3>
                      Zhang social media pop also known when smart innocent...
                    </h3>
                  </a>
                </div>
                <div className="post-next">
                  <a>
                    <span>
                      Next Post <i className="fa fa-angle-right" />
                    </span>
                    <h3>
                      Zhang social media pop also known when smart innocent...
                    </h3>
                  </a>
                </div>
              </nav> */}
              {commentArray.map((comet, index) => (
                <div className="author-box" key={index}>
                  <div className="author-img pull-left">
                    <img src="images/news/author.png" alt />
                  </div>
                  <div className="author-info">
                    <h3>{comet.userName}</h3>
                    <p style={{ textAlign: "justify" }}>{comet.newsComment}</p>
                  </div>
                </div>
              ))}

              <div className="related-posts block">
                <h3 className="utf_block_title">
                  <span>Related Posts</span>
                </h3>
                <div
                  id="utf_latest_news_slide"
                  className="  utf_latest_news_slide"
                >
                  <div className="item ">
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
                      breakpoints={{
                        360: {
                          slidesPerView: 2,
                          spaceBetween: 5,
                        },
                        460: {
                          slidesPerView: 2,
                          spaceBetween: 5,
                        },
                        720: {
                          slidesPerView: 3,
                          spaceBetween: 20,
                        },
                        1080: {
                          slidesPerView: 6,
                          spaceBetween: 7,
                        },
                      }}
                    >
                      <div>
                        {latestNews.map((news) => (
                          <SwiperSlide>
                            <div className="col-lg-3 col-md-4 col-sm-6">
                              <div className="utf_post_block_style clearfix ">
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
                                <a
                                  className="utf_post_cat"
                                  style={{ cursor: "pointer" }}
                                >
                                  {news.category}
                                </a>
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
                                  <div className="utf_post_meta">
                                    <span className="utf_post_date">
                                      <i className="fa fa-clock-o" />
                                      {moment(news.createdAt).format(
                                        "MMM DD, YYYY"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
              {/* Post comment start */}
              {/* <div id="comments" className="comments-area block">
                <h3 className="utf_block_title">
                  <span>03 Comments</span>
                </h3>
                <ul className="comments-list">
                  <li>
                    <div className="comment">
                      <img
                        className="comment-avatar pull-left"
                        alt
                        src="images/news/user1.png"
                      />
                      <div className="comment-body">
                        <div className="meta-data">
                          <span className="comment-author">Miss Lisa Doe</span>
                          <span className="comment-date pull-right">
                            15 Jan, 2022
                          </span>
                        </div>
                        <div className="comment-content">
                          <p style={{ textAlign: "justify" }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since It has
                            survived not only five centuries, but also the leap
                            into electronic type setting, remaining essentially
                            unchanged.
                          </p>
                        </div>
                        <div className="text-left">
                          <a className="comment-reply">
                            <i className="fa fa-share" /> Reply
                          </a>
                        </div>
                      </div>
                    </div>
                    <ul className="comments-reply">
                      <li>
                        <div className="comment">
                          <img
                            className="comment-avatar pull-left"
                            alt
                            src="images/news/user2.png"
                          />
                          <div className="comment-body">
                            <div className="meta-data">
                              <span className="comment-author">
                                Miss Lisa Doe
                              </span>
                              <span className="comment-date pull-right">
                                15 Jan, 2022
                              </span>
                            </div>
                            <div className="comment-content">
                              <p style={{ textAlign: "justify" }}>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since It
                                has survived not only five centuries, but also
                                the leap into electronic type setting, remaining
                                essentially unchanged.
                              </p>
                            </div>
                            <div className="text-left">
                              <a className="comment-reply">
                                <i className="fa fa-share" /> Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="comment last">
                      <img
                        className="comment-avatar pull-left"
                        alt
                        src="images/news/user1.png"
                      />
                      <div className="comment-body">
                        <div className="meta-data">
                          <span className="comment-author">Miss Lisa Doe</span>
                          <span className="comment-date pull-right">
                            15 Jan, 2022
                          </span>
                        </div>
                        <div className="comment-content">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since It has
                            survived not only five centuries, but also the leap
                            into electronic type setting, remaining essentially
                            unchanged.
                          </p>
                        </div>
                        <div className="text-left">
                          <a className="comment-reply">
                            <i className="fa fa-share" /> Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> */}
              {/* Post comment end */}
              {/* Comments Form Start */}
              <div className="comments-form">
                <h3 className="title-normal">Leave a comment</h3>
                <form onSubmit={submit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Name"
                          type="text"
                          disabled
                          value={name}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          type="email"
                          disabled
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Phone"
                          type="text"
                          disabled
                          value={mobile}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Subject"
                          type="text"
                          required
                        />
                      </div> */}
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control required-field"
                          id="message"
                          placeholder="Comment"
                          rows={10}
                          required
                          defaultValue={""}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <p style={{ color: "tomato" }}>{errorMassage}</p>
                  <div className="clearfix">
                    <button
                      className="comments-btn btn btn-primary"
                      type="submit"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
              {/* Comments form end */}
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
                        <li className="clearfix" key={news._id}>
                          <div className="utf_post_block_style post-float clearfix">
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
                                {/* <a
                                  className="utf_post_cat"
                                  style={{ color: "#fff" }}
                                >
                                  {news.category}
                                </a> */}
                              </div>
                            </Link>
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
                <div className="widget widget-tags">
                  <h3 className="utf_block_title">
                    <span>Popular Tags</span>
                  </h3>
                  <ul className="unstyled clearfix">
                    {universalTags.map((tag) => (
                      <li style={{ cursor: "pointer" }}>
                        <a key={tag._id}>{tag.name}</a>
                      </li>
                    ))}
                    {universalTags
                      .slice()
                      .reverse()
                      .map((tag) => (
                        <li style={{ cursor: "pointer" }}>
                          <a key={tag._id}>{tag.name}</a>
                        </li>
                      ))}
                  </ul>
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

export default NewsInfo;
