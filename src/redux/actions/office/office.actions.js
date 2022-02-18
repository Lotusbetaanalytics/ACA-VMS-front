import axios from "axios";
import { GET_OFFICE_FAIL, GET_OFFICE_SUCCESS } from "../../constants/constants";
const BASE_URL = "http://localhost:4000/api/v1/office";

export const getOffice = (search, setSearch, _) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/search/?q=${search}`);
      setSearch(res.data.data);
      dispatch({
        type: GET_OFFICE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_OFFICE_FAIL,
        payload: error.message,
      });
    }
  };
};
