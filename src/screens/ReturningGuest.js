import { Input, Button } from "@chakra-ui/react";
import React from "react";

const ReturningGuest = () => {
  return (
    <div>
      <label htmlFor="">Enter Guest Name</label>
      <div className="verify__token">
        <Input
          placeholder="Enter Guest Name"
          value=""
          onChange={(e) => {
            // setSearch(e.target.value);
          }}
        />
        <Button
          onClick=""
          //   isLoading={loading}
          loadingText="Searching..."
          //   colorScheme={loading ? "blue" : "telegram"}
        >
          Find Guest
        </Button>
      </div>
      Returning Guest
    </div>
  );
};

export default ReturningGuest;
