import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LogTable from "../../components/LogsTable";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import {
  getCentralData,
  getFrontDashboardData,
} from "../../redux/actions/frontdesk/frontdesk.dashboard.actions";

const PreBookedVisitors = () => {
  const state = useSelector((state) => state.frontDashboard);
  const [visitors, setVisitors] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (state.success) {
      setVisitors(state.payload.prebooks);
    }
  }, [state]);

  React.useEffect(() => {
    const typeofFrontDesk = JSON.parse(localStorage.getItem("frontdesk")).user
      .isSuperAdmin;

    if (typeofFrontDesk) {
      dispatch(
        getCentralData(
          new Date(JSON.parse(localStorage.getItem("toDate"))).toISOString(),
          new Date(JSON.parse(localStorage.getItem("toDate"))).toISOString()
        )
      );
    } else {
      dispatch(
        getFrontDashboardData(
          new Date(JSON.parse(localStorage.getItem("fromDate"))).toISOString(),
          new Date(JSON.parse(localStorage.getItem("toDate"))).toISOString()
        )
      );
    }
  }, [dispatch]);

  return (
    <div>
      <NavbarFront />
      <div style={{ marginLeft: "15%" }}>
        <LogTable data={visitors} title="Pre Booked Guests" />
      </div>
    </div>
  );
};

export default PreBookedVisitors;
