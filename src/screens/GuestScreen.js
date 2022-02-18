import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import NavbarFront from "../components/NavbarFront/NavbarFront";
import "./screen.styles.css";
import NewGuest from "./NewGuest";

const GuestScreen = () => {
  return (
    <div className="guestscreen__container">
      <NavbarFront />
      <div className="guestscreen__content">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Create New Guest</Tab>
            <Tab>Returning Guest</Tab>
            <Tab>Verify Guest Token</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <NewGuest />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestScreen;
