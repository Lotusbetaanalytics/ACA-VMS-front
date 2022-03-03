import axios from "axios";
import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_FRONT_DESK,
  CREATE_FRONT_DESK_FAIL,
  BASE_URL,
} from "../../constants/constants";
export const startLogin = (
  data,
  toast,
  navigate,
  setLoading,
  setFrontLoggedIn
) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/frontdesk/auth/login`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };
    try {
      dispatch({
        type: START_LOGIN,
      });
      const res = await axios(config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      setLoading(false);
      localStorage.setItem("frontdesk", JSON.stringify(res.data));
      setFrontLoggedIn(JSON.parse(localStorage.getItem("frontdesk")));
      navigate("/frontdesk/dashboard");
    } catch (err) {
      setLoading(false);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message || err.message,
      });
      toast({
        title: "An error Occured!",
        description: `${err.response.data.message || err.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};

export const createFrontDesk = (data, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/frontdesk/auth`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(config);
      dispatch({
        type: CREATE_FRONT_DESK,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success",
        description: "Front Desk Created Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (err) {
      dispatch({
        type: CREATE_FRONT_DESK_FAIL,
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
