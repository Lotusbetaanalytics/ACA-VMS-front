import axios from "axios";
import {
  ADD_GUEST,
  ADD_GUEST_FAIL,
  GET_STAFF_GUEST,
  GET_STAFF_GUEST_FAIL,
} from "../../constants/constants";
const BASE_URL = "http://localhost:4000/api/v1/guest";

export const addGuest = (data, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/new`,
      headers: {
        "Content-Type": "application/json",
        "access-token": JSON.parse(localStorage.getItem("staff")).token,
      },
      data: data,
    };

    try {
      const res = await axios(config);
      console.log(res.data);
      dispatch({
        type: ADD_GUEST,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success! 😉",
        description: `Guest Added 🎉`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (err) {
      dispatch({
        type: ADD_GUEST_FAIL,
        payload: err.message || err.response.data.message,
      });
      setLoading(false);
      toast({
        title: "An error Occured!",
        description: `${err.message || err.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};

export const getStaffGuest = (setData, setLoading) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/staff`,
    headers: {
      "Content-Type": "application/json",
      "access-token": JSON.parse(localStorage.getItem("staff")).token,
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios(config);
      setData(res.data.data);
      dispatch({
        type: GET_STAFF_GUEST,
        payload: res.data,
      });
      setLoading(false);
    } catch (error) {
      dispatch({
        type: GET_STAFF_GUEST_FAIL,
        payload: error.message,
      });
    }
    setLoading(false);
  };
};
