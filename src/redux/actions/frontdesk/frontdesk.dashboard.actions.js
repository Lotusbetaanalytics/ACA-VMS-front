import axios from "axios";
import {
  BASE_URL,
  GET_FRONT_DASHBOARD_SUCCESS,
  GET_FRONT_DASHBOARD_FAIL,
  GET_FRONT_DASHBOARD_START,
} from "../../constants/constants";

export const getFrontDashboardData = (from, to) => {
  localStorage.setItem("toDate", JSON.stringify(to));
  localStorage.setItem("fromDate", JSON.stringify(from));
  const config = {
    method: "get",
    url: `${BASE_URL}/dashboard/all/?from=${from}&to=${to}`,
    headers: {
      contentType: "application/json",
      "access-token": JSON.parse(localStorage.getItem("frontdesk")).token,
    },
  };
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_FRONT_DASHBOARD_START,
      });
      const res = await axios(config);

      dispatch({
        type: GET_FRONT_DASHBOARD_SUCCESS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FRONT_DASHBOARD_FAIL,
        payload: err.response.data.message || err.message,
      });
    }
  };
};
export const getCentralData = (from, to) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/dashboard/central/?from=${from}&to=${to}`,
    headers: {
      contentType: "application/json",
      "access-token": JSON.parse(localStorage.getItem("frontdesk")).token,
    },
  };
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_FRONT_DASHBOARD_START,
      });
      const res = await axios(config);

      dispatch({
        type: GET_FRONT_DASHBOARD_SUCCESS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FRONT_DASHBOARD_FAIL,
        payload: err.response.data.message || err.message,
      });
    }
  };
};
