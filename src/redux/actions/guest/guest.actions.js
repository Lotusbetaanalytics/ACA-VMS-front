import axios from "axios";
import {
  ADD_GUEST,
  ADD_GUEST_FAIL,
  GET_STAFF_GUEST,
  GET_STAFF_GUEST_FAIL,
  APPROVE_GUEST,
  APPROVE_GUEST_FAIL,
  REJECT_GUEST,
  REJECT_GUEST_FAIL,
  BASE_URL,
} from "../../constants/constants";

export const addGuest = (data, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "post",
      url: `${BASE_URL}/guest/new`,
      headers: {
        "Content-Type": "application/json",
        "access-token": JSON.parse(localStorage.getItem("frontdesk")).token,
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
        description: `${err.response.data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
};

export const getStaffGuest = (from, to) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/guest/staff/?from=${from}&to=${to}`,
    headers: {
      "Content-Type": "application/json",
      "access-token": JSON.parse(localStorage.getItem("staff")).token,
    },
  };
  return async (dispatch) => {
    try {
      const res = await axios(config);

      dispatch({
        type: GET_STAFF_GUEST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_STAFF_GUEST_FAIL,
        payload: error.message,
      });
    }
  };
};

export const approveGuest = (id, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "patch",
      url: `${BASE_URL}/guest/approve/${id}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": JSON.parse(localStorage.getItem("staff")).token,
      },
    };

    try {
      const res = await axios(config);
      dispatch({
        type: APPROVE_GUEST,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success! 😉",
        description: `Guest Approved 🎉`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (err) {
      dispatch({
        type: APPROVE_GUEST_FAIL,
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

export const rejectGuest = (id, toast, setLoading) => {
  return async (dispatch) => {
    const config = {
      method: "patch",
      url: `${BASE_URL}/guest/reject/${id}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": JSON.parse(localStorage.getItem("staff")).token,
      },
    };

    try {
      const res = await axios(config);
      dispatch({
        type: REJECT_GUEST,
        payload: res.data,
      });
      setLoading(false);
      toast({
        title: "Success! 😉",
        description: `Guest Rejected 🎉`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (err) {
      dispatch({
        type: REJECT_GUEST_FAIL,
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
