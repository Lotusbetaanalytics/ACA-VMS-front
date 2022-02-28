import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogTable from "../components/LogsTable";
import NavbarFront from "../components/NavbarFront/NavbarFront";

import {
  getFrontDeskLogs,
  getAllLogs,
} from "../redux/actions/logs/frontofficelogs.action";

const Logs = () => {
  const [officeAdminLogs, setOfficeAdminLogs] = React.useState([]);
  const [centralReceptionLogs, setCentralReceptionLogs] = React.useState([]);
  const [frontisSuperFrontDesk, setFrontisSuperFrontDesk] = React.useState(
    JSON.parse(localStorage.getItem("frontdesk")).user.isSuperAdmin
  );
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set Super Admin Status
  React.useEffect(() => {
    const frontDesk = JSON.parse(localStorage.getItem("frontdesk"));
    if (!frontDesk) {
      navigate("/");
    }
    if (frontDesk.user.isSuperAdmin) {
      setLoading(true);
      dispatch(getAllLogs(setCentralReceptionLogs, setLoading));
      console.log(setFrontisSuperFrontDesk);
    }
    if (!frontDesk.user.isSuperAdmin) {
      setLoading(true);
      dispatch(getFrontDeskLogs(setOfficeAdminLogs, setLoading));
    }
  }, [navigate, dispatch]);

  return (
    <>
      <NavbarFront />
      {frontisSuperFrontDesk ? (
        <div className="logs__container">
          {loading ? (
            <div>fetching...</div>
          ) : (
            <LogTable data={centralReceptionLogs} />
          )}
        </div>
      ) : (
        <div className="logs__container">
          {loading ? (
            <div>fetching...</div>
          ) : (
            <LogTable data={officeAdminLogs} />
          )}
        </div>
      )}
    </>
  );
};

export default Logs;
