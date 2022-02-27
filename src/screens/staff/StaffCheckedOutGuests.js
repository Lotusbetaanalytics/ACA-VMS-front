import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import ShowDataTable from "../../components/Table";
import { getStaffGuest } from "../../redux/actions/guest/guest.actions";
import "./staff.css";
import { Spinner, Select } from "@chakra-ui/react";
const StaffCheckedOutGuests = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [to, setTo] = React.useState(new Date(Date.now()).toISOString());
  const [from, setFrom] = React.useState(new Date(Date.now()).toISOString());
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.staffGuests;
  });

  React.useEffect(() => {
    if (state.success) {
      setData(state.payload.checkedOut);
      setLoading(false);
    }
  }, [data, state]);

  React.useEffect(() => {
    setLoading(true);
    dispatch(getStaffGuest(from, to));
  }, [dispatch, from, to]);

  const selectHandler = (e) => {
    if (e.target.selectedIndex === 0) {
      setTo(new Date(Date.now()).toISOString());
      setFrom(new Date(Date.now()).toISOString());
    } else if (e.target.selectedIndex === 1) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
      );
    } else if (e.target.selectedIndex === 2) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
      );
    }
  };

  return (
    <div className="viewprebook__container">
      <Navbar />

      <div className="data__container">
        <div
          className="header__details"
          style={{
            marginTop: "10%",
            top: "10%",
            zIndex: "1",
            position: "relative",
          }}
        >
          <h2>My Checked In Guests</h2>
          <div className="filter__date">
            <span style={{ fontSize: "10px" }}>Pick a Date</span>
            <Select variant="flushed" onChange={selectHandler}>
              <option value="">Today</option>
              <option value="">Last 7 Days</option>
              <option value="">Last 30 Days</option>
              {/* <option value="">Custom</option> */}
            </Select>
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="rgb(241,114,48)"
              size="xl"
            />
          </div>
        ) : (
          <ShowDataTable data={data} title="Checked Out Guests" />
        )}
      </div>
    </div>
  );
};

export default StaffCheckedOutGuests;
