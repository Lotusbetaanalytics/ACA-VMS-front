import { combineReducers } from "@reduxjs/toolkit";
import { frontDeskReducer } from "./frontdesk/frontdesk.reducer";

const rootReducer = combineReducers({
  frontDesk: frontDeskReducer,
});

export default rootReducer;
