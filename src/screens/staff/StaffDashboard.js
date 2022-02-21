import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallCard from "../../components/Cards/SmallCard";
import Navbar from "../../components/Navbar/Navbar";
import "./staff.css";
import { Select } from "@chakra-ui/react";
const StaffDashboard = () => {
  return (
    <>
      <div className="staff__dashboard__container">
        <Navbar />
        <div className="staff__dashboard__content">
          <div className="header__details">
            <h2>See what your Dashboard looks like today.</h2>
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
    </>
  );
};

export default StaffDashboard;
