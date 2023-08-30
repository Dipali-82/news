import React from "react";
import { Outlet } from "react-router-dom";
import MainHedaer from "./MainHedaer";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <MainHedaer />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
