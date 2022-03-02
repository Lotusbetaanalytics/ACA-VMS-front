import { Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../redux/constants/constants";
import "./screen.styles.css";
const ReturningGuest = () => {
  const [found, setFound] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`${BASE_URL}/returning/?phone=${search}`)
      .then((res) => {
        console.log(res.data);
        setFound(res.data.guest);
        setLoading(false);
        setShow(true);
        setSearch("");
      })
      .catch((error) => {
        setFound({});
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <div>
      <label htmlFor="">Enter Guest Number</label>
      <form className="verify__token" onSubmit={clickHandler}>
        <Input
          placeholder="Enter Guest Number"
          value={search}
          required
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          isLoading={loading}
          loadingText="Searching..."
          colorScheme={loading ? "blue" : "telegram"}
          type="submit"
        >
          Find Guest
        </Button>
      </form>
      <div style={{ marginTop: "30px" }}>
        {show
          ? found.map((guest) => {
              return (
                <form key={guest._id} className="returning__guest">
                  <div>
                    <label htmlFor="">Guest Name</label>
                    <Input value={guest.fullname} readOnly />
                  </div>
                  <div className="guest__mobile">
                    <label htmlFor="">Guest Mobile</label>
                    <Input value={guest.mobile} readOnly />
                  </div>
                  <div className="guest__mobile">
                    <label htmlFor="">Guest Email Address</label>
                    <Input value={guest.email} readOnly />
                  </div>
                  <div className="guest__photo">
                    <img src={guest.photo} alt="" />
                  </div>
                  <Button>CheckIn Guest</Button>
                </form>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default ReturningGuest;
