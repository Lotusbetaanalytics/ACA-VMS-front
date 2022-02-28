import axios from "axios";
import {
  GET_FRONT_DASHBOARD_SUCCESS,
  GET_FRONT_DASHBOARD_FAIL,
  GET_FRONT_DASHBOARD_START,
} from "../../constants/constants";

export const getFrontDashboardData = (from, to) => {
  localStorage.setItem("toDate", JSON.stringify(to));
  localStorage.setItem("fromDate", JSON.stringify(from));
  const config = {
    method: "get",
    url: `/api/v1/dashboard/all/?from=${from}&to=${to}`,
    headers: {
      contentType: "application/json",
      "Access-Control-Allow-Origin": "*",
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
  localStorage.setItem("toDate", JSON.stringify(to));
  localStorage.setItem("fromDate", JSON.stringify(from));
  const config = {
    method: "get",
    url: `/api/v1/dashboard/central/?from=${from}&to=${to}`,
    headers: {
      contentType: "application/json",
      "access-token": JSON.parse(localStorage.getItem("frontdesk")).token,
      "Access-Control-Allow-Origin": "*",
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
