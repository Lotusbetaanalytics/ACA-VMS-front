import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogTable from "../components/LogsTable";
import NavbarFront from "../components/NavbarFront/NavbarFront";

import { getFrontDeskLogs } from "../redux/actions/logs/frontofficelogs.action";

const Logs = () => {
  const [officeAdminLogs, setOfficeAdminLogs] = React.useState([]);
  const [centralReceptionLogs, setCentralReceptionLogs] = React.useState([]);
  const [frontisSuperFrontDesk, setFrontisSuperFrontDesk] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    dispatch(getFrontDeskLogs(setOfficeAdminLogs, setLoading));
  }, [dispatch]);
  React.useEffect(() => {
    const frontDesk = JSON.parse(localStorage.getItem("frontdesk"));
    if (!frontDesk) {
      navigate("/");
    } else {
      setFrontisSuperFrontDesk(frontDesk.user.isSuperAdmin);
    }
  }, [navigate]);

  return (
    <>
      <NavbarFront />
      {frontisSuperFrontDesk ? (
        <div className="logs__container">SuperAdmin Logs</div>
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
