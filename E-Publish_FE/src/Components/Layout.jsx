import React from "react";
import Navbar from "./Navbar";
const Layout = ({children})=>
{
    return(
        <>
        <div className="flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-grow mt-16">{children}</main>
        
        </div>
        </>
    );
};

export default Layout;