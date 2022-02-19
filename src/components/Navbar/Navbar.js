import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  AiFillAppstore,
  AiOutlineUserSwitch,
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {};
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <img src={logo} alt="ACA" />
      </div>
      <div className="navbar__links">
        <Link to="/staff/dashboard" className="links__dashboard">
          <div className="link">
            <AiFillAppstore />
            <h3>Dashboard</h3>
          </div>
        </Link>
        <Link to="/staff/viewprebook" className="links__guest">
          <div className="link">
            <AiOutlineUserSwitch />
            <h3>My PreBooked Guests</h3>
          </div>
        </Link>

        <Link to="/staff/prebook" className="links__prebook">
          <div className="link">
            <AiOutlineTeam />
            <h3>PreBook A Guest</h3>
          </div>
        </Link>
        <Link to="/admin/prebook" className="links__prebook">
          <div className="link">
            <AiOutlineTeam />
            <h3>My Pending Guests</h3>
          </div>
        </Link>
        <Link to="/admin/prebook" className="links__prebook">
          <div className="link">
            <AiOutlineTeam />
            <h3>My Checked In Guests</h3>
          </div>
        </Link>
        <Link to="/staff/guest" className="links__prebook">
          <div className="link">
            <AiOutlineTeam />
            <h3>My Guests</h3>
          </div>
        </Link>
        <button onClick={logoutHandler} className="links__logout">
          <div className="link">
            <FaSignOutAlt />
            <h3>Logout</h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
