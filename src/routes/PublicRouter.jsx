import React from "react";
import Header from "../layouts/client/header";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/client/footer";
import Navbar from "../layouts/client/navbar";

export default function PublicRouter() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
