import React from "react";
import "./Header.css"
import logo from "../assets/videos/logo.gif"

const Header = () =>{
    return(
        <div className="header-container">
            <h1>Houssam Belkassaoui</h1>
            <img 
                src={logo} 
                alt="logo"
                width="200"
                height="200"
                className="logo-image"
            />
        </div>
    );
}
export default Header