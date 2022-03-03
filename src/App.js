import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontDeskLogin from "./screens/frontdesk/FrontDeskLogin";
import "bootstrap/dist/css/bootstrap.min.css";
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
import Home from "./screens/Home/Home";
import Visitors from "./screens/FrontDashboard/Visitors";
import PendingVisitors from "./screens/FrontDashboard/Pending";
import CheckedInVisitors from "./screens/FrontDashboard/CheckedIn";
import CheckedOutVisitors from "./screens/FrontDashboard/CheckedOut";
import AllStaff from "./screens/FrontDashboard/AllStaff";
import AllFrontDesk from "./screens/FrontDashboard/AllFrontdesk";
import PreBookedVisitors from "./screens/FrontDashboard/PreBooked";
import StaffCheckedOutGuests from "./screens/staff/StaffCheckedOutGuests";
import StaffCheckedIn from "./screens/staff/StaffCheckedinGuests";
import StaffPendingGuests from "./screens/staff/StaffPendingGuests";
import StaffLoggedInContext from "./context/StaffLoggedInContext";
import FrontDeskContext from "./context/FrontDeskLoggedInContext";

function App() {
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState("");
  const [staffLoggedIn, setstaffLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("staff"))
  );
  const [frontLoggedIn, setFrontLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("frontdesk"))
  );

  return (
    <>
      <FrontDeskContext.Provider value={{ frontLoggedIn, setFrontLoggedIn }}>
        <StaffLoggedInContext.Provider
          value={{ staffLoggedIn, setstaffLoggedIn }}
        >
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
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/frontdesk/login"
                  element={<FrontDeskLogin />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/visitors"
                  element={<Visitors />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/pending"
                  element={<PendingVisitors />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/checkedin"
                  element={<CheckedInVisitors />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/checkedout"
                  element={<CheckedOutVisitors />}
                />

                <Route
                  exact
                  path="/frontdesk/dashboard/allstaff"
                  element={<AllStaff />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/allfrontdesk"
                  element={<AllFrontDesk />}
                />
                <Route
                  exact
                  path="/frontdesk/dashboard/prebooks"
                  element={<PreBookedVisitors />}
                />
                <Route exact path="/logs" element={<Logs />} />
                <Route
                  exact
                  path="/frontdesk/addoffice"
                  element={<AddOffice />}
                />
                <Route
                  exact
                  path="/frontdesk/guest"
                  element={<GuestScreen />}
                />
                <Route
                  exact
                  path="/frontdesk/seeguest"
                  element={<ViewGuests />}
                />
                <Route path="*" element={<h2>Page Not Found</h2>} />
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

                {/* Staff Routes */}
                <Route
                  exact
                  path="/staff/dashboard"
                  element={<StaffDashboard />}
                />
                <Route exact path="/staff/guest" element={<StaffGuest />} />
                <Route exact path="/staff/login" element={<StaffLogin />} />
                <Route exact path="/staff/prebook" element={<Prebook />} />
                <Route
                  exact
                  path="/staff/checkedin"
                  element={<StaffCheckedIn />}
                />
                <Route
                  exact
                  path="/staff/checkedout"
                  element={<StaffCheckedOutGuests />}
                />
                <Route
                  exact
                  path="/staff/pending"
                  element={<StaffPendingGuests />}
                />
                <Route
                  exact
                  path="/staff/viewprebook"
                  element={<ViewPreBookedGuest />}
                />
              </Routes>
            </Router>
          </AutoCompleteContext.Provider>
        </StaffLoggedInContext.Provider>
      </FrontDeskContext.Provider>
    </>
  );
}

export default App;
