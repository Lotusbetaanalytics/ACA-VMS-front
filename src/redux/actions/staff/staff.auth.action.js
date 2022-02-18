import axios from "axios";
import {
  START_STAFF_LOGIN,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
} from "../../constants/constants";
const BASE_URL = "http://localhost:4000/api/v1";
export const startStaffLogin = (data, toast, navigate) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/staff/login`,
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

      localStorage.setItem("staff", JSON.stringify(res.data));
      navigate("/staff/dashboard");
    } catch (err) {
      dispatch({
        type: STAFF_LOGIN_FAIL,
        payload: err.message || err.response.data.message,
      });
      toast({
        title: "An error Occured!",
        description: `${err.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};
