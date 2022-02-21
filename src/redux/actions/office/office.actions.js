import axios from "axios";
import {
  GET_OFFICE_FAIL,
  GET_OFFICE_SUCCESS,
  BASE_URL,
} from "../../constants/constants";

export const getOffice = (search, setSearch, _) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/office/search/?q=${search}`);
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
