import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallCard from "../../components/Cards/SmallCard";
import Navbar from "../../components/Navbar/Navbar";
import "./staff.css";
import { Select } from "@chakra-ui/react";
const StaffDashboard = () => {
  const [username, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("staff"));
    if (!user) {
      navigate("/staff/login");
    } else {
      setUserName(user.data.fullname);
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 0 && hours < 12) {
        setGreeting("Good Morning");
      } else if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }
  }, [navigate]);

  return (
    <div className="frontdesk__dashboard__container">
      <Navbar />
      <div className="dashboard__content">
        <div className="header__details">
          <h2>
            {greeting} {username}! See what your Dashboard looks like today.
          </h2>
          <div className="filter__date">
            <span style={{ fontSize: "10px" }}>Pick a Date</span>
            <Select variant="flushed">
              <option value="">Today</option>
              <option value="">Last 7 Days</option>
              <option value="">Last 30 Days</option>
              <option value="">Custom</option>
            </Select>
          </div>
        </div>
        <div className="dashboard__smallcards">
          <SmallCard value={0} title="TOTAL VISITORS" />
          <SmallCard value={0} title="CHECKED IN VISITORS" />
          <SmallCard value={0} title="INVITEES" />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
