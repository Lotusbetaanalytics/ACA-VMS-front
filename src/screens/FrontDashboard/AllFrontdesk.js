import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import FrontDeskLogTable from "../../components/ViewAllFrontDesk";
import {
  getCentralData,
  getFrontDashboardData,
} from "../../redux/actions/frontdesk/frontdesk.dashboard.actions";

const AllFrontDesk = () => {
  const state = useSelector((state) => state.frontDashboard);
  const [visitors, setVisitors] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (state.success) {
      console.log(state.payload.admin);
      setVisitors(state.payload.admin);
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
        <FrontDeskLogTable data={visitors} />
      </div>
    </div>
  );
};

export default AllFrontDesk;
