import {
  Button,
  Input,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Camera } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { addGuest } from "../redux/actions/guest/guest.actions";
import { getAStaffFromToken } from "../redux/actions/staff/staff.auth.action";
import { WebcamComponent } from "./NewGuest";

import "./screen.styles.css";

const VerifyGuest = () => {
  const [search, setSearch] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [data, setData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [tag, setTag] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photo, setPhoto] = React.useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const clickHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(getAStaffFromToken(search, setData, setLoading, toast, setShow));
    setSearch("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading1(true);
    const userdata = {
      fullname: data.fullname,
      phone: data.phone,
      purpose: data.purpose,
      email: data.email,
      checkedIn: true,
      photo,
      tag,
    };
    dispatch(addGuest(userdata, toast, setLoading1));
    setTag("");
  };

  return (
    <>
      <div>
        <label htmlFor="">Enter Token Here</label>
        <div className="verify__token">
          <Input
            placeholder="Enter Guest Token"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            onClick={clickHandler}
            isLoading={loading}
            loadingText="Searching..."
            colorScheme={loading ? "blue" : "telegram"}
          >
            Verify Token
          </Button>
        </div>
        {show ? (
          <form className="guest__verified__details" onSubmit={submitHandler}>
            <div>
              <label htmlFor="">Guest Name</label>
              <Input value={data.fullname} readOnly />
            </div>
            <div>
              <label htmlFor="">Purpose</label>
              <Input value={data.purpose} readOnly />
            </div>
            <div>
              <label htmlFor="">Guest Email Address</label>
              <Input value={data.email} readOnly />
            </div>
            <div>
              <label htmlFor="">Date Expected</label>
              <Input value={data.date} readOnly />
            </div>
            <div>
              <label htmlFor="">Time Expected</label>
              <Input value={data.time} readOnly />
            </div>
            <div>
              <label htmlFor="">Guest Company</label>
              <Input
                value={data.company || company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Tag Number</label>
              <Input
                required
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
            </div>
            <div className="takephoto">
              <div className="visitor__photo">
                <Button
                  onClick={onOpen}
                  my={3}
                  rightIcon={<Camera />}
                  colorScheme="orange"
                >
                  Take visitor Photo
                </Button>
                <img src={photo} alt="" />
              </div>

              <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Take Photo</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div style={{ margin: "auto auto", paddingLeft: "10px" }}>
                      <WebcamComponent setPhoto={setPhoto} onClose={onClose} />
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={loading1}
              loadingText="Adding..."
            >
              Check In Guest
            </Button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default VerifyGuest;
