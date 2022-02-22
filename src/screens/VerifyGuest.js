import { Button, Input, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { getAStaffFromToken } from "../redux/actions/staff/staff.auth.action";
import "./screen.styles.css";

const VerifyGuest = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const clickHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(getAStaffFromToken(search, setData, setLoading, toast, setShow));
    setSearch("");
  };

  return (
    <>
      <div>
        <label htmlFor="">Enter Token Here</label>
        <div className="verify__token">
          <Input
            placeholder="Enter Guest Token"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            onClick={clickHandler}
            isLoading={loading}
            loadingText="Searching..."
            colorScheme={loading ? "blue" : "telegram"}
          >
            Verify Token
          </Button>
        </div>
        {show ? (
          <form className="guest__verified__details">
            <div>
              <label htmlFor="">Guest Name</label>
              <Input value={data.fullname} readOnly />
            </div>
            <div>
              <label htmlFor="">Purpose</label>
              <Input value={data.purpose} readOnly />
            </div>
            <div>
              <label htmlFor="">Guest Email Address</label>
              <Input value={data.purpose} readOnly />
            </div>
            <div>
              <label htmlFor="">Date Expected</label>
              <Input value={data.date} readOnly />
            </div>
            <div>
              <label htmlFor="">Time Expected</label>
              <Input value={data.time} readOnly />
            </div>
            <Button colorScheme="green">Check In Guest</Button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default VerifyGuest;
