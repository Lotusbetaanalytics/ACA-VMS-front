import {
  GET_STAFF_PREBOOK_FAIL,
  GET_STAFF_PREBOOK_SUCCESS,
  STAFF_CREATE_PREBOOK_SUCCESS,
  STAFF_CREATE_PREBOOK_FAIL,
  START_GET_STAFF_PREBOOK,
  STAFF_DELETE_PREBOOK_FAIL,
  STAFF_DELETE_PREBOOK_SUCCESS,
  BASE_URL,
} from "../../constants/constants";

import axios from "axios";

export const getStaffPreBooks = (setLoading, setData) => {
  return async (dispatch) => {
    const { token } = JSON.parse(localStorage.getItem("staff"));
    const config = {
      method: "get",
      url: `${BASE_URL}/prebook`,
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
      },
    };

    try {
      dispatch({
        type: START_GET_STAFF_PREBOOK,
      });
      const res = await axios(config);
      dispatch({
        type: GET_STAFF_PREBOOK_SUCCESS,
        payload: res.data.data,
      });
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch({
        type: GET_STAFF_PREBOOK_FAIL,
        payload: err.message || err.response.data.message,
      });
    }
  };
};

export const prebookGuest = (data, setLoading, toast) => {
  const config = {
    method: "post",
    url: `${BASE_URL}/prebook`,
    headers: {
      "Content-Type": "application/json",
      "access-token": JSON.parse(localStorage.getItem("staff")).token,
    },
    data: data,
  };
  return async (dispatch) => {
    try {
      const res = await axios(config);
      dispatch({
        type: STAFF_CREATE_PREBOOK_SUCCESS,
        payload: res.data.data,
      });
      toast({
        title: "Success 😉",
        description: `Prebook created successfully 👍`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    } catch (error) {
      dispatch({
        type: STAFF_CREATE_PREBOOK_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
      toast({
        title: "An error Occured!",
        description: `${error.message || error.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};

export const deletePreBook = (id, setLoading, toast) => {
  const config = {
    method: "delete",
    url: `${BASE_URL}/prebook/${id}`,
    headers: {
      "Content-Type": "application/json",
      "access-token": JSON.parse(localStorage.getItem("staff")).token,
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios(config);
      dispatch({
        type: STAFF_DELETE_PREBOOK_SUCCESS,
        payload: res.data.data,
      });
      toast({
        title: "Success 😉",
        description: `Prebook deleted successfully 👍`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    } catch (error) {
      dispatch({
        type: STAFF_DELETE_PREBOOK_FAIL,
        payload: error.message || error.response.data.message,
      });
      setLoading(false);
      toast({
        title: "An error Occured!",
        description: `${error.message || error.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};
