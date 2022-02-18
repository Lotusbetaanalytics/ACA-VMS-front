import React from "react";
import "./components.styles.css";
import logo from "../assets/Logo-ACA.svg";
const Header = () => {
  return (
    <div className="header__container">
      <div className="header__logo">
        <img src={logo} alt="ACA" />
      </div>
      <div className="header__text">
        <h1>AFRICAN CAPITAL ALLIANCE VISITORS MANAGEMENT SYSTEM</h1>
      </div>
    </div>
  );
};

export default Header;
