import { combineReducers } from "@reduxjs/toolkit";
import { getFrontDashboardData } from "./frontdesk/frontDashboard.reducer";
import { frontDeskReducer } from "./frontdesk/frontdesk.reducer";

const rootReducer = combineReducers({
  frontDesk: frontDeskReducer,
  frontDashboard: getFrontDashboardData,
});

export default rootReducer;
