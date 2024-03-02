import React from "react";

import Header from "./../Header/Header"
import AppRoutes from "../../Routes/AppRoutes"
// import AdminRoutes from "../../admin/Routes/AdminRoutes";
import Footer from "../Footer/Footer";


const Layout = () => {
  return (
    <>  
        <Header/>
        <AppRoutes/>
        <Footer/>
    </>
  )
}

export default Layout