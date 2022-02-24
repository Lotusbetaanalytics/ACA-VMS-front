import axios from "axios";
import {
  GET_OFFICE_FAIL,
  GET_OFFICE_SUCCESS,
  BASE_URL,
  ADD_OFFICE,
  ADD_OFFICE_FAIL,
} from "../../constants/constants";

export const getOffice = (search, setSearch, setShow) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}/office/search/?q=${search}`);
      setSearch(res.data.data);
      dispatch({
        type: GET_OFFICE_SUCCESS,
        payload: res.data,
      });
      setShow(true);
    } catch (error) {
      dispatch({
        type: GET_OFFICE_FAIL,
        payload: error.message,
      });
    }
  };
};

export const addOffice = (data, setLoading, toast) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/office`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(config);
      dispatch({
        type: ADD_OFFICE,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success 😉",
        description: `Office Added 👍`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      dispatch({
        type: ADD_OFFICE_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
      toast({
        title: "Error 😢",
        description: `An error occured! Please try again`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};
