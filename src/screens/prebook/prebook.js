import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { handleChange } from "./prebook.events";
import "./prebook.css";
import { Button, useToast } from "@chakra-ui/react";
import { prebookGuest } from "../../redux/actions/staff/staff.prebook";

const Prebook = () => {
  const [fullname, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      fullname,
      time,
      date,
      purpose,
      company,
      email,
      mobile: phoneNumber,
    };
    setLoading(true);
    dispatch(prebookGuest(data, setLoading, toast));
    setTime(time);
    setName("");
    setDate("");
    setTime("");
    setPurpose("");
    setEmail("");
    setPhone("");
    setCompany("");
  };

  return (
    <div className="Prebook__container">
      <div className="prebook__navbar">
        <Navbar />
      </div>
      <div className="heading__form">
        <div className="prebook__pagetitle">
          {/* <PageTitle heading="Prebook a Guest" /> */}
        </div>
        <form
          className="inputfields"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="date__time">
            <label htmlFor="name">Guest Name</label>
            <TextField
              id="name"
              value={fullname}
              placeholder="Guest Name"
              variant="outlined"
              type="text"
              onChange={(event) => handleChange(event, setName)}
            />
          </div>
          <div className="date__time">
            <label htmlFor="visit">Purpose of Visit</label>
            <TextField
              id="visit"
              placeholder="Purpose of visit"
              variant="outlined"
              type="text"
              value={purpose}
              onChange={(event) => handleChange(event, setPurpose)}
            />
          </div>
          <div className="date__time">
            <label htmlFor="email">Guest Email</label>
            <TextField
              id="email"
              type="email"
              value={email}
              placeholder="Guest Email"
              variant="outlined"
              onChange={(event) => handleChange(event, setEmail)}
            />
          </div>
          <div className="date__time">
            <label htmlFor="host">Guest Mobile</label>
            <TextField
              id="mobile"
              placeholder="Guest Mobile"
              variant="outlined"
              type="text"
              value={phoneNumber}
              onChange={(event) => handleChange(event, setPhone)}
            />
          </div>
          <div className="date__time">
            <label htmlFor="host">Company</label>
            <TextField
              id="host"
              placeholder="Company"
              value={company}
              variant="outlined"
              onChange={(event) => {
                handleChange(event, setCompany);
              }}
            />
          </div>
          <div className="date__time">
            <label htmlFor="date">Expected Date</label>
            <TextField
              type="date"
              id="date"
              variant="outlined"
              value={date}
              onChange={(event) => handleChange(event, setDate)}
            />
          </div>

          <div className="date__time">
            <label htmlFor="time">Expected Time</label>
            <TextField
              variant="outlined"
              id="time"
              type="time"
              value={time}
              onChange={(event) => handleChange(event, setTime)}
            />
          </div>
          <div className="date__time">
            <Button
              colorScheme="green"
              disabled={
                fullname && email && date && time && purpose ? false : true
              }
              type="submit"
              isLoading={loading}
              loadingText="Submitting..."
              style={{ marginTop: "25px", padding: "26px" }}
            >
              Pre Book Guest
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Prebook;
