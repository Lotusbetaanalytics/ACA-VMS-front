import React from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import Input from "../../components/Input/Input";
import "../frontdesk/frontdesk.css";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { startStaffLogin } from "../../redux/actions/staff/staff.auth.action";
import Header from "../../components/Header";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setLoading(true);
    dispatch(startStaffLogin(data, toast, navigate, setLoading));
    setEmail("");
    setPassword("");
  };

  return (
    <div className="frontdesk__login__container">
      <Header />
      <div className="login__container">
        {/* <div className="login__container__image">
          <img src={reception} alt="" />
        </div> */}
        <form onSubmit={submitHandler}>
          <div>
            {/* <h3>Log in to the</h3> */}
            <h1>
              Staff <span style={{ color: "#f17230" }}>Portal</span>
            </h1>
          </div>
          <div className="email">
            <label htmlFor="">Email Address</label>
            <Input
              placeholder="Enter Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="password">
            <label htmlFor="">Password</label>
            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="login__button">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="solid"
              width="410px"
              isLoading={loading}
              loadingText="Logging in..."
              type="submit"
              isDisabled={password && email?.length > 0 ? false : true}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
