import React from "react";
import "./Header.css"
import logo from "../assets/imgs/N1S-2.png"

const Header = () =>{
    return(
        <div className="header-container">
        <img src={logo} 
                alt="logo"
                className="logo-image"
            />
            <h1 className="Title">The Demnetia Lair</h1>
            
        </div>
    );
}
export default Header