import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainLayout from "./component/layout/MainLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import NewsInfo from "./pages/NewsInfo";
import AboutUs from "./pages/AboutUs";
import Error404 from "./pages/Error404";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { getCategory } from "./redux/category/CategorySlice";
import { getSubCategory } from "./redux/subCategory/SubCategorySlice";
import { getUniversalTag } from "./redux/universalTag/UniversalTagSlice";
import { getCategoryTag } from "./redux/categoryTag/CategoryTagSlice";
import { getAllNews } from "./redux/news/NewsSlice";
import { messaging } from "./pages/Firebase";
import { getMessaging, getToken } from "firebase/messaging";
import TagPage from "./pages/TagPage";
import ReporterRegistation from "./pages/ReporterRegistation";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import MobileCategory from "./pages/MobileCategory";
import YoutubeVideos from "./pages/YoutubeVideos";
import { Helmet } from "react-helmet";

const firebaseConfig = {
  apiKey: "AIzaSyBBLrumA6Ex8JdyM6m8JXMJipgm4JIs0BQ",
  authDomain: "alikidideeplink.firebaseapp.com",
  projectId: "alikidideeplink",
  storageBucket: "alikidideeplink.appspot.com",
  messagingSenderId: "194171433527",
  appId: "1:194171433527:web:830281a21b02d6f2eec5b2",
  measurementId: "G-MBY63PW6HH",
};
// const apps = initializeApp(firebaseConfig);
// const analytics = getAnalytics(apps);

function App() {
  const { loginData } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  // useEffect(() => {
  //   function handleContextMenu(e) {
  //     e.preventDefault();
  //   }
  //   const rootElement = document.getElementById("my-component");
  //   rootElement.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     rootElement.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  async function requestParimission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BOwodOj-Tf7ZtOqHPL6WF1MTj0JxtFA79p9DG4FHZcFNzcFEACHxmTtzfKj_vv5EwRlSEgs85_DVLSnVebeP5FE",
      });
    } else if (permission === "denied") {
      // alert("permission denied");
    }
  }

  useEffect(() => {
    requestParimission();
  }, []);

  useEffect(() => {
    //get category
    dispatch(getCategory());
    //getSubCategory
    dispatch(getSubCategory());
    //universalTags
    dispatch(getUniversalTag());
    //categoryTagtotal
    dispatch(getCategoryTag());
    //categoryTagtotal
    dispatch(getAllNews());
  }, []);

  //<Link to={`/news-post-info/${news.slugUrl}`}>  </Link>

  return (
    <>
      <div id="my-component" className="dontCopy">
        <BrowserRouter basename="/" >
          <ScrollToTop />
          <Helmet>
            <title>Alikidi.com - Home </title>
            <meta
              name="description"
              content=" సామాన్యుని గుండె చప్పుడు..... అలికిడి "
            />
         
          </Helmet>
          <Routes>
            <Route path="/" exact element={<MainLayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/category/:catslugurl" element={<Category />} />
              <Route path="/tag/:catslugurl" element={<TagPage />} />
              <Route
                path="/news-post-info/:newsslugurl"
                index
                element={<NewsInfo />}
              />

              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/reporter-registation"
                element={<ReporterRegistation />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" index element={<AboutUs />} />
              <Route
                path="/MobileCategory"
                index
                element={<MobileCategory />}
              />
              <Route path="/YoutubeVideos" index element={<YoutubeVideos />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
