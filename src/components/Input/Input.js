import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

import React from "react";
function InputComponent({ placeholder, value, onChange }) {
  return (
    <InputGroup size="lg">
      <InputLeftElement width="2rem">
        <EmailIcon />
      </InputLeftElement>
      <Input
        pr="4rem"
        type="text"
        htmlSize={30}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  );
}

export default InputComponent;
