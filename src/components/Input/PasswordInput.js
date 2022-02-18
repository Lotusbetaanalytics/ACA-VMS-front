import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

import React from "react";
function PasswordInput({ value, onChange }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="lg">
      <InputLeftElement width="2rem">
        <LockIcon />
      </InputLeftElement>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        htmlSize={30}
        value={value}
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
