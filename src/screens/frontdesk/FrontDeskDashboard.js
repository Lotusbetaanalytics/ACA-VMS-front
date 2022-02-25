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
  FaRegCalendarAlt,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import "./dashboard.css";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { getFrontDashboardData } from "../../redux/actions/frontdesk/frontdesk.dashboard.actions";

const Dashboard = () => {
  const [visitorsToday, setVisitors] = useState(null);
  const [allStaff, setAllStaff] = useState(null);
  const [allAdmin, setAllAdmin] = useState(0);
  const [preBookedGuests, setPreBookedGuests] = useState(null);
  const [checkedIn, setCheckedIn] = useState(null);
  const [checkedOut, setCheckedOut] = useState(null);
  const [pendingVisitors, setPending] = useState(null);
  const [queryDate, setQueryDate] = React.useState(
    new Date().toLocaleDateString()
  );

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.frontDashboard;
  });

  // console.log(dt.toLocaleDateString());
  React.useEffect(() => {
    if (state.success) {
      setPending(state.payload.pendingGuests.length);
      setVisitors(state.payload.Guests.length);
      setCheckedIn(state.payload.checkedIn.length);
      setCheckedOut(state.payload.checkedOut.length);
      setAllStaff(state.payload.staff.length);
      setPreBookedGuests(state.payload.prebooks.length);
      setAllAdmin(state.payload.admin.length);
    }
  }, [state]);

  React.useEffect(() => {
    dispatch(getFrontDashboardData(queryDate));
  }, [dispatch, queryDate]);

  const onChangeHandler = (e) => {
    setQueryDate(e.target.value);
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
                <option value={new Date().toLocaleDateString()}>Today</option>
                <option
                  value={new Date(
                    new Date().setDate(new Date().getDate() - 7)
                  ).toLocaleDateString()}
                >
                  Last 7 days
                </option>
                <option
                  value={new Date(
                    new Date().setDate(new Date().getDate() - 30)
                  ).toLocaleDateString()}
                >
                  Last 30 days
                </option>
              </Select>
            </div>
          </div>
          <div className="dashboard__title__cards">
            <div className="cards">
              <DashboardCard
                number={visitorsToday}
                icon={<FaWalking />}
                color="teal"
                path="/front/vistors"
              >
                Visitors
              </DashboardCard>
              <DashboardCard
                number={pendingVisitors}
                icon={<FaBusAlt />}
                color="purple"
                path="/admin/pending"
              >
                Pending Visitors today
              </DashboardCard>
              <DashboardCard
                number={checkedIn}
                icon={<FaCheck />}
                color="orange"
                path="/admin/checkedin"
              >
                Checked-In Today
              </DashboardCard>
              <DashboardCard
                number={checkedOut}
                icon={<FaShare />}
                color="pink"
                path="/admin/checkedout"
              >
                Checked-Out
              </DashboardCard>
              <DashboardCard
                number={preBookedGuests}
                icon={<FaBriefcase />}
                color="green"
                path="/admin/prebookedguests"
              >
                PreBooked Guests
              </DashboardCard>
              <DashboardCard
                number={allStaff}
                icon={<FaUsers />}
                color="blue"
                path="/admin/allstaff"
              >
                All Staff
              </DashboardCard>
              <DashboardCard
                number={allAdmin}
                icon={<FaUsersCog />}
                path="/admin/admins"
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
              visitors={visitorsToday}
              pending={pendingVisitors}
              checkedin={checkedIn}
              checkedout={checkedOut}
              allVisitors={preBookedGuests}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
