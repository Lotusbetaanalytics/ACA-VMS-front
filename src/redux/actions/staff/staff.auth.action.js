import axios from "axios";
import {
  START_STAFF_LOGIN,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
} from "../../constants/constants";
const BASE_URL = "http://localhost:4000/api/v1/staff";
export const startStaffLogin = (data, toast, navigate, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      dispatch({
        type: START_STAFF_LOGIN,
      });
      const res = await axios(config);

      dispatch({
        type: STAFF_LOGIN_SUCCESS,
        payload: res.data,
      });
      setLoading(false);
      localStorage.setItem("staff", JSON.stringify(res.data));
      navigate("/staff/dashboard");
    } catch (err) {
      dispatch({
        type: STAFF_LOGIN_FAIL,
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

export const addStaff = (data, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const res = await axios(config);
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success 😉",
        description: `Staff Added 👍`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      dispatch({
        type: ADD_USER_FAIL,
        payload: err.message || err.response.data.message,
      });
      setLoading(false);
      toast({
        title: "An error Occured!",
        description: `${err.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
};
