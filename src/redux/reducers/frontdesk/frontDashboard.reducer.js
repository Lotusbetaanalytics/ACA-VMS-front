import {
  GET_FRONT_DASHBOARD_SUCCESS,
  GET_FRONT_DASHBOARD_START,
  GET_FRONT_DASHBOARD_FAIL,
} from "../../constants/constants";

export const getFrontDashboardData = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_FRONT_DASHBOARD_START:
      return {
        loading: true,
      };
    case GET_FRONT_DASHBOARD_SUCCESS:
      return {
        loading: false,
        success: true,
        payload,
      };
    case GET_FRONT_DASHBOARD_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      };

    default:
      return state;
  }
};
