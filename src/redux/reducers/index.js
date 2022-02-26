import { combineReducers } from "@reduxjs/toolkit";
import { getFrontDashboardData } from "./frontdesk/frontDashboard.reducer";
import { frontDeskReducer } from "./frontdesk/frontdesk.reducer";
import { getStaffGuestReducer } from "./staff/staffGuests.reducer";

const rootReducer = combineReducers({
  frontDesk: frontDeskReducer,
  frontDashboard: getFrontDashboardData,
  staffGuests: getStaffGuestReducer,
});

export default rootReducer;
