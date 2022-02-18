import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import WebcamComponent from "../components/WebCam";

const NewGuest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Take Photo</Button>
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
    </>
  );
};

export default NewGuest;
