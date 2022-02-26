import {
  GET_STAFF_GUEST,
  GET_STAFF_GUEST_FAIL,
} from "../../constants/constants";

export const getStaffGuestReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_STAFF_GUEST:
      return {
        success: true,
        payload,
      };
    case GET_STAFF_GUEST_FAIL:
      return {
        success: false,
        payload,
      };
    default:
      return state;
  }
};
