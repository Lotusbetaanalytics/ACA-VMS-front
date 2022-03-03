import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  AiFillAppstore,
  AiOutlineUserSwitch,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import PageTitle from "../PageTitle/PagetitleStaff";
// import { FactCheckTwoTone } from "@mui/icons-material";
import { InsertInvitationSharp } from "@material-ui/icons";
import StaffLoggedInContext from "../../context/StaffLoggedInContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { staffLoggedIn } = React.useContext(StaffLoggedInContext);
  const logoutHandler = () => {
    localStorage.removeItem("staff");
    navigate("/staff/login");
  };

  const [username, setUserName] = React.useState("");

  React.useEffect(() => {
    if (staffLoggedIn) {
      setUserName(staffLoggedIn.data.fullname);
    } else {
      navigate("/staff/login");
    }
  }, [staffLoggedIn, navigate]);
  return (
    <>
      <PageTitle user={username} />
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
              <InsertInvitationSharp />
              <h3>PreBook A Guest</h3>
            </div>
          </Link>
          {/* <Link to="/staff/pending" className="links__prebook">
            <div className="link">
              <TimerSharp />
              <h3>My Pending Guests</h3>
            </div>
          </Link> */}
          {/* <Link to="/staff/checkedin" className="links__prebook">
            <div className="link">
              <FactCheckTwoTone />
              <h3>My Checked In Guests</h3>
            </div>
          </Link> */}
          {/* <Link to="/staff/checkedout" className="links__prebook">
            <div className="link">
              <FaSignOutAlt />
              <h3>My Checked Out Guests</h3>
            </div>
          </Link> */}
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
    </>
  );
};

export default Navbar;
