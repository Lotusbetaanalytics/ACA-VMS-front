import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SelectIcon = () => {
  return (
    <Menu>
      <MenuButton variant="flushed" as={Button} rightIcon={<ChevronDownIcon />}>
        Pick a Date
      </MenuButton>
      <MenuList>
        <MenuItem>Today</MenuItem>
        <MenuItem>last 30 days</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SelectIcon;
