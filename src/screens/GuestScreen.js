import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import NavbarFront from "../components/NavbarFront/NavbarFront";
import "./screen.styles.css";
import NewGuest from "./NewGuest";
import VerifyGuest from "./VerifyGuest";
import ReturningGuest from "./ReturningGuest";
import NewDelivery from "./staff/Delivery";

const GuestScreen = () => {
  return (
    <div className="guestscreen__container">
      <NavbarFront />
      <div className="guestscreen__content">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList style={{ color: "white" }}>
            <Tab>Create New Guest</Tab>
            <Tab>Returning Guest</Tab>
            <Tab>Verify Guest Token</Tab>
            <Tab>Delivery Personnel</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <NewGuest />
            </TabPanel>
            <TabPanel>
              <ReturningGuest />
            </TabPanel>
            <TabPanel>
              <VerifyGuest />
            </TabPanel>
            <TabPanel>
              <NewDelivery />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestScreen;
