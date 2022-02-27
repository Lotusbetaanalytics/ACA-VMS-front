import React, { useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Chart from "../../components/Chart/Chart";
import Navbar from "../../components/NavbarFront/NavbarFront";
import { useDispatch } from "react-redux";
import {
  FaWalking,
  FaBusAlt,
  FaCheck,
  FaShare,
  FaBriefcase,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import "./dashboard.css";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import {
  getFrontDashboardData,
  getCentralData,
} from "../../redux/actions/frontdesk/frontdesk.dashboard.actions";

const Dashboard = () => {
  const [visitorsToday, setVisitors] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [preBookedGuests, setPreBookedGuests] = useState([]);
  const [checkedIn, setCheckedIn] = useState([]);
  const [checkedOut, setCheckedOut] = useState([]);
  const [pendingVisitors, setPending] = useState([]);
  const [fromQueryDate, setQueryDate] = React.useState(
    new Date(Date.now()).toISOString()
  );
  const [toQueryDate, setToQueryDate] = React.useState(
    new Date(Date.now()).toISOString()
  );

  console.log(new Date(Date.now()).toISOString());
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.frontDashboard;
  });

  React.useEffect(() => {
    if (state.success) {
      setPending(state.payload.pendingGuests);
      setVisitors(state.payload.Guests);
      setCheckedIn(state.payload.checkedIn);
      setCheckedOut(state.payload.checkedOut);
      setAllStaff(state.payload.staff);
      setPreBookedGuests(state.payload.prebooks);
      setAllAdmin(state.payload.admin);
    }
  }, [state]);

  //identify current frontdesk
  React.useEffect(() => {
    const typeofFrontDesk = JSON.parse(localStorage.getItem("frontdesk")).user
      .isSuperAdmin;

    if (typeofFrontDesk) {
      dispatch(getCentralData(fromQueryDate, toQueryDate));
    } else {
      dispatch(getFrontDashboardData(fromQueryDate, toQueryDate));
    }
  }, [dispatch, fromQueryDate, toQueryDate]);

  const onChangeHandler = (e) => {
    if (e.target.selectedIndex === 0) {
      setQueryDate(new Date(Date.now()).toISOString());
      setToQueryDate(new Date(Date.now()).toISOString());
    } else if (e.target.selectedIndex === 1) {
      setQueryDate(new Date(Date.now()).toISOString());
      setToQueryDate(
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
      );
    } else {
      setQueryDate(new Date(Date.now()).toISOString());
      setToQueryDate(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
      );
    }
  };

  return (
    <>
      <div className="frontdesk__dashboard__container">
        <Navbar />
        <div className="front__dashboard__container">
          <div className="datepicker__heading">
            <h1>Dashboard</h1>
            <div>
              <label htmlFor="">Pick a date</label>
              <Select onChange={onChangeHandler}>
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 days</option>
                <option value="">Last 30 days</option>
              </Select>
            </div>
          </div>
          <div className="dashboard__title__cards">
            <div className="cards">
              <DashboardCard
                number={visitorsToday.length}
                icon={<FaWalking />}
                color="teal"
                path="/frontdesk/dashboard/visitors"
              >
                Visitors
              </DashboardCard>
              <DashboardCard
                number={pendingVisitors.length}
                icon={<FaBusAlt />}
                color="purple"
                path="/frontdesk/dashboard/pending"
              >
                Pending Visitors
              </DashboardCard>
              <DashboardCard
                number={checkedIn.length}
                icon={<FaCheck />}
                color="orange"
                path="/frontdesk/dashboard/checkedin"
              >
                Checked-In Guests
              </DashboardCard>
              <DashboardCard
                number={checkedOut.length}
                icon={<FaShare />}
                color="pink"
                path="/frontdesk/dashboard/checkedout"
              >
                Checked-Out Guests
              </DashboardCard>
              <DashboardCard
                number={preBookedGuests.length}
                icon={<FaBriefcase />}
                color="green"
                path="/frontdesk/dashboard/prebooks"
              >
                PreBooked Guests
              </DashboardCard>
              <DashboardCard
                number={allStaff.length}
                icon={<FaUsers />}
                color="blue"
                path="/frontdesk/dashboard/allstaff"
              >
                All Staff
              </DashboardCard>
              <DashboardCard
                number={allAdmin.length}
                icon={<FaUsersCog />}
                path="/frontdesk/dashboard/allfrontdesk"
                color="red"
              >
                Available Admins
              </DashboardCard>
            </div>
          </div>

          <div
            className="chart"
            style={{
              width: "20%",
              position: "relative",
              left: "40%",
              top: "10%",
            }}
          >
            <Chart
              visitors={visitorsToday.length}
              pending={pendingVisitors.length}
              checkedin={checkedIn.length}
              checkedout={checkedOut.length}
              allVisitors={preBookedGuests.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
