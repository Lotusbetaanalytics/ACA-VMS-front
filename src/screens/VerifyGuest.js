import { Button, Input } from "@chakra-ui/react";
import React from "react";
import "./screen.styles.css";
const VerifyGuest = () => {
  return (
    <>
      <div>
        <label htmlFor="">Enter Token Here</label>
        <div className="verify__token">
          <Input placeholder="Enter Guest Token" />
          <Button>Verify Token</Button>
        </div>
        <form></form>
      </div>
    </>
  );
};

export default VerifyGuest;
