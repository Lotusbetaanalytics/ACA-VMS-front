import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import WebcamComponent from "../components/WebCam";
import "./screen.styles.css";
import { CameraFront } from "@material-ui/icons";
const NewGuest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <form className="newguest__staff">
        <div className="newguest__form__container">
          <div>
            <label htmlFor="">Title</label>
            <Select name="" id="">
              <option value="">Mr</option>
            </Select>
          </div>
          <div>
            <label htmlFor="">Full name</label>
            <Input type="text" />
          </div>
          <div>
            <label htmlFor="">Company</label>
            <Input type="text" />
          </div>
          <div>
            <label htmlFor="">Purpose of Visit</label>
            <Input type="text" />
          </div>
          <div>
            <label htmlFor="">Mobile Number</label>
            <Input type="text" />
          </div>
          <div>
            <label htmlFor="">Part of a Group?</label>
            <Input type="text" />
          </div>
          <div className="takephoto">
            <Button onClick={onOpen} rightIcon={<CameraFront />}>
              Take Photo
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Take Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div style={{ margin: "auto auto", paddingLeft: "10px" }}>
                    <WebcamComponent />
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
        <div className="staff__information__container">
          <h2>Staff to see</h2>
          <div className="staff__information">
            <div>
              <label htmlFor="">Name of Staff</label>
              <Input type="text" />
            </div>
            <div>
              <label htmlFor="">Staff Office</label>
              <Input type="text" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewGuest;
