import axios from "axios";
import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../../constants/constants";
const BASE_URL = "http://localhost:4000/api/v1";
export const startLogin = (data, toast, navigate, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/frontdesk/auth/login`,
      headers: {
        "Content-Type": "application/json",
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
      navigate("/frontdesk/dashboard");
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
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
