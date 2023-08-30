import React, { useEffect, useState } from "react";
import FeaturePost from "./home/FeaturePost";
import LatestNews from "./home/LatestNews";
import AddsPage from "./home/AddsPage";
import CategoryOne from "./home/CategoryOne";
import CategoryTwo from "./home/CategoryTwo";
import SlidingCategory from "./home/SlidingCategory";
import AddPage2 from "./home/AddPage2";

import { Modal, ModalHeader } from "reactstrap";
import NotificationHome from "./home/NotificationHome";

import { Helmet } from "react-helmet";

function Home() {
  const [model, setModel] = useState(false);
  return (
    <>
      <Helmet>
        <title>Alikidi.com - Home </title>
        <link rel="icon" href="/favlogoico300x300.png" />
        <meta
          name="description"
          content=" సామాన్యుని గుండె చప్పుడు..... అలికిడి "
        />
        {/* <link rel="icon" href="https://alikidi.com/favlogoico300x300.png" /> */}
        <link
          rel="apple-touch-icon"
          href="https://alikidi.com/favlogoico300x300.png"
        />
        <link
          rel="shortcut icon"
          type="image/ico"
          href="/favlogoico300x300.png"
        />
        <link rel="fluid-icon" type="image/png" href="/favlogoico300x300.png" />
        <meta property="og:image" content="/favlogoico300x300.png" />
        <meta property="og:title" content="Alikidi.com - Home " />
        <meta
          property="og:description"
          content=" సామాన్యుని గుండె చప్పుడు..... అలికిడి "
        />
      </Helmet>
      {/* <NotificationHome /> */}

      <FeaturePost />
      <LatestNews />
      <AddsPage />
      <CategoryOne />
      <CategoryTwo />
      <SlidingCategory />
      <AddPage2 />
    </>
  );
}

export default Home;
