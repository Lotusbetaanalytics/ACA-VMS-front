import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontDeskLogin from "./screens/frontdesk/FrontDeskLogin";

import FrontDeskDashboard from "./screens/frontdesk/FrontDeskDashboard";
import StaffDashboard from "./screens/staff/StaffDashboard";
import StaffLogin from "./screens/staff/staffLogin";
import Prebook from "./screens/prebook/prebook";
import ViewPreBookedGuest from "./screens/staff/viewPreBooked";
import GuestScreen from "./screens/GuestScreen";
import StaffGuest from "./screens/staff/StaffGuest";
import AddFrontDesk from "./screens/frontdesk/AddFrontDesk";
import AutoCompleteContext from "./context/AutoCompleteContext";
import AddOffice from "./screens/frontdesk/AddOffice";
import Logs from "./screens/Logs";
import ViewGuests from "./screens/ViewGuests";

function App() {
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState("");

  return (
    <>
      <AutoCompleteContext.Provider
        value={{
          value,
          setValue,
          id,
          setId,
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<FrontDeskLogin />} />
            <Route exact path="/logs" element={<Logs />} />
            <Route exact path="/frontdesk/addoffice" element={<AddOffice />} />
            <Route exact path="/frontdesk/guest" element={<GuestScreen />} />
            <Route exact path="/frontdesk/seeguest" element={<ViewGuests />} />
            <Route
              exact
              path="/frontdesk/register"
              element={<AddFrontDesk />}
            />
            <Route
              exact
              path="/frontdesk/dashboard"
              element={<FrontDeskDashboard />}
            />
            <Route exact path="/staff/dashboard" element={<StaffDashboard />} />
            <Route exact path="/staff/guest" element={<StaffGuest />} />
            <Route exact path="/staff/login" element={<StaffLogin />} />
            <Route exact path="/staff/prebook" element={<Prebook />} />
            <Route
              exact
              path="/staff/viewprebook"
              element={<ViewPreBookedGuest />}
            />
          </Routes>
        </Router>
      </AutoCompleteContext.Provider>
    </>
  );
}

export default App;
