import React, { useEffect, useState } from "react";
import SmallCard from "../../components/Cards/SmallCard";
import Navbar from "../../components/Navbar/Navbar";
import "./staff.css";
import { Select } from "@chakra-ui/react";
import { getStaffGuest } from "../../redux/actions/guest/guest.actions";
import { useDispatch, useSelector } from "react-redux";

const StaffDashboard = () => {
  const [to, setTo] = useState(new Date(Date.now()).toISOString());
  const [from, setFrom] = useState(new Date(Date.now()).toISOString());
  const [totalVisitors, setTotalVisitors] = useState(null);
  const [checkedIn, setCheckedIn] = useState(null);
  const [prebook, setPrebook] = useState(null);

  const selectHandler = (e) => {
    if (e.target.selectedIndex === 0) {
      setTo(new Date(Date.now()).toISOString());
      setFrom(new Date(Date.now()).toISOString());
    } else if (e.target.selectedIndex === 1) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
      );
    } else if (e.target.selectedIndex === 2) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
      );
    }
  };

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.staffGuests;
  });

  useEffect(() => {
    if (state.success) {
      setTotalVisitors(state.payload.guest.length);
      setCheckedIn(state.payload.checkedIn.length);
      setPrebook(state.payload.prebook.length);
    }
  }, [state]);

  useEffect(() => {
    dispatch(getStaffGuest(from, to));
  }, [dispatch, from, to]);

  return (
    <>
      <div className="staff__dashboard__container">
        <Navbar />
        <div className="staff__dashboard__content">
          <div className="header__details">
            <h2>See what your Dashboard looks like today.</h2>
            <div className="filter__date">
              <span style={{ fontSize: "10px" }}>Pick a Date</span>
              <Select variant="flushed" onChange={selectHandler}>
                <option value="">Today</option>
                <option value="">Last 7 Days</option>
                <option value="">Last 30 Days</option>
                {/* <option value="">Custom</option> */}
              </Select>
            </div>
          </div>
          <div className="dashboard__smallcards">
            <SmallCard value={totalVisitors} title="TOTAL VISITORS" />
            <SmallCard value={checkedIn} title="CHECKED IN VISITORS" />
            <SmallCard value={prebook} title="INVITEES" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;
