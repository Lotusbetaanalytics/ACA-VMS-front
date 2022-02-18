import React from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import ShowDataTable from "../../components/Table";
import { getStaffPreBooks } from "../../redux/actions/staff/staff.prebook";
import "./staff.css";
import { Spinner } from "@chakra-ui/react";
const ViewPreBookedGuest = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setLoading(true);
    dispatch(getStaffPreBooks(setLoading, setData));
  }, [dispatch]);

  return (
    <div className="viewprebook__container">
      <Navbar />
      <div className="data__container">
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
          <ShowDataTable data={data} />
        )}
      </div>
    </div>
  );
};

export default ViewPreBookedGuest;
