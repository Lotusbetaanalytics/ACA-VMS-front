import axios from "axios";
import {
  BASE_URL,
  GET_FRONT_DASHBOARD_SUCCESS,
  GET_FRONT_DASHBOARD_FAIL,
  GET_FRONT_DASHBOARD_START,
} from "../../constants/constants";

export const getFrontDashboardData = (queryDate) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/dashboard/all/?q=${queryDate}`,
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
