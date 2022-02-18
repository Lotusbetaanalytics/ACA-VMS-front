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
} from "@chakra-ui/react";
import WebcamComponent from "../components/WebCam";
import "./screen.styles.css";
import { CameraFront } from "@material-ui/icons";
const NewGuest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <form className="newguest__form__container">
        <div>
          <label htmlFor="">Title</label>
          <select name="" id="">
            <option value="">Mr</option>
          </select>
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
          <label htmlFor="">Whom to see</label>
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
      </form>
    </>
  );
};

export default NewGuest;
