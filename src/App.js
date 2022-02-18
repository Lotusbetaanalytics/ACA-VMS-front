import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontDeskLogin from "./screens/frontdesk/FrontDeskLogin";
import { ChakraProvider } from "@chakra-ui/react";
import FrontDeskDashboard from "./screens/frontdesk/FrontDeskDashboard";
import StaffDashboard from "./screens/staff/StaffDashboard";
import StaffLogin from "./screens/staff/staffLogin";
import Prebook from "./screens/prebook/prebook";
import ViewPreBookedGuest from "./screens/staff/viewPreBooked";
import GuestScreen from "./screens/GuestScreen";

function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<FrontDeskLogin />} />
            <Route exact path="/frontdesk/guest" element={<GuestScreen />} />
            <Route
              exact
              path="/frontdesk/dashboard"
              element={<FrontDeskDashboard />}
            />
            <Route exact path="/staff/dashboard" element={<StaffDashboard />} />
            <Route exact path="/staff/login" element={<StaffLogin />} />
            <Route exact path="/staff/prebook" element={<Prebook />} />
            <Route
              exact
              path="/staff/viewprebook"
              element={<ViewPreBookedGuest />}
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
