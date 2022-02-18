import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  START_LOGIN,
} from "../../constants/constants";

export const frontDeskReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case START_LOGIN:
      return {
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        data: payload,
      };
    case LOGIN_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
