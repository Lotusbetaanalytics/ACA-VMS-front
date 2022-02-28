import axios from "axios";
import {
  GET_FRONT_LOGS,
  GET_FRONT_LOGS_FAIL,
  GET_ALL_LOGS,
  GET_ALL_LOGS_FAIL,
} from "../../constants/constants";

export const getFrontDeskLogs = (setOfficeAdminLogs, setLoading) => {
  return async (dispatch) => {
    const office = JSON.parse(localStorage.getItem("frontdesk")).user.office;
    try {
      const res = await axios.get(`/api/v1/logs/?q=${office}`);
      dispatch({
        type: GET_FRONT_LOGS,
        payload: res.data,
      });
      setOfficeAdminLogs(res.data.data);
      setLoading(false);
    } catch (error) {
      dispatch({
        type: GET_FRONT_LOGS_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
    }
  };
};

export const getAllLogs = (setLogs, setLoading) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/v1/logs/all`);
      dispatch({
        type: GET_ALL_LOGS,
        payload: res.data,
      });
      setLogs(res.data.data);
      setLoading(false);
    } catch (error) {
      dispatch({
        type: GET_ALL_LOGS_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
    }
  };
};
