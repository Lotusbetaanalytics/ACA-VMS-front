import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  // Table,
  // Thead,
  // Tbody,
  // Tr,
  // Th,
  // Td,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useToast,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
} from "@chakra-ui/react";
import "./staff.css";
import {
  approveGuest,
  getStaffGuest,
  rejectGuest,
} from "../../redux/actions/guest/guest.actions";
import { useDispatch, useSelector } from "react-redux";
import StaffLoggedInContext from "../../context/StaffLoggedInContext";
// import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
const StaffGuest = () => {
  const { staffLoggedIn } = React.useContext(StaffLoggedInContext);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userPhoto, setUserPhoto] = React.useState("");
  const [id, setId] = React.useState("");
  const [guestStatus, setGuestStatus] = React.useState("Pending");
  const [to, setTo] = useState(
    new Date(Date.now()).toISOString() ||
      new Date(JSON.parse(localStorage.getItem("to"))).toISOString()
  );
  const [from, setFrom] = useState(
    new Date(Date.now()).toISOString() ||
      new Date(JSON.parse(localStorage.getItem("from"))).toISOString()
  );

  const toast = useToast();
  const clickHandler = (event) => {
    onOpen();
    setUserPhoto(event.target.src);
    setId(event.target.id);
    setGuestStatus(event.target.alt);
  };

  const state = useSelector((state) => {
    return state.staffGuests;
  });

  React.useEffect(() => {
    if (state.success) {
      setData(state.payload.guest);
      setLoading(false);
    }
  }, [state]);

  React.useEffect(() => {
    if (staffLoggedIn) {
      dispatch(getStaffGuest(from, to));
    }
  }, [dispatch, guestStatus, from, to, staffLoggedIn]);

  const selectHandler = (e) => {
    if (e.target.selectedIndex === 0) {
      setTo(new Date(Date.now()).toISOString());
      setFrom(new Date(Date.now()).toISOString());
    } else if (e.target.selectedIndex === 1) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
      );
    } else if (e.target.selectedIndex === 2) {
      setFrom(new Date(Date.now()).toISOString());
      setTo(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()
      );
    }
  };

  return (
    <div className="staff__guest_container">
      <Navbar />
      <div className="staff__guest__contents">
        <div className="header__details">
          <h2>My Guests</h2>
          <div className="filter__date">
            <span style={{ fontSize: "10px" }}>Pick a Date</span>
            <Select variant="flushed" onChange={selectHandler}>
              <option value="">Today</option>
              <option value="">Last 7 Days</option>
              <option value="">Last 30 Days</option>
              {/* <option value="">Custom</option> */}
            </Select>
          </div>
        </div>
        <div
          style={{
            width: "90%",
            paddingRight: "10px",
            height: "100%",
            overflow: "scroll",
          }}
        >
          {loading ? (
            <div className="loader">
              <Spinner size="xl" />
            </div>
          ) : (
            <Table responsive="md" striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Full Name</th>
                  <th>Mobile Number</th>
                  <th>Email Address</th>
                  <th>Purpose of Visit</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Photo</th>
                  {/* <th>Date</th> */}
                </tr>
              </thead>
              <tbody>
                {data.length < 0 ? (
                  <tr>
                    <td>No Guest!</td>
                  </tr>
                ) : (
                  data.map(
                    ({
                      _id,
                      fullname,
                      email,
                      photo,
                      status,
                      createdAt,
                      company,
                      mobile,
                      purpose,
                      title,
                    }) => {
                      return (
                        <tr key={_id}>
                          <td>{title}</td>
                          <td>{fullname}</td>
                          <td>{mobile}</td>
                          <td>{email}</td>
                          <td>{purpose}</td>
                          <td>{company}</td>
                          {/* <Tr> */}
                          <td>{status}</td>
                          {/* <Td>
                            <Button>Approve</Button>
                          </Td>
                          <Td>
                            <Button>Decline</Button>
                          </Td> */}
                          {/* </Tr> */}
                          <td style={{ width: "100px" }}>
                            <div
                              onClick={clickHandler}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={photo}
                                // style={{ width: "40%" }}
                                alt={status}
                                id={_id}
                              />
                            </div>

                            <Modal isOpen={isOpen} onClose={onClose}>
                              <ModalOverlay />
                              <ModalContent>
                                <ModalHeader>Guest Photo</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    padding: "20px",
                                  }}
                                >
                                  <img src={userPhoto} alt="" />
                                  {guestStatus === "Pending" ? (
                                    <div className="approval__buttons">
                                      <Button
                                        colorScheme="green"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          dispatch(
                                            approveGuest(id, toast, setLoading)
                                          );

                                          setTimeout(() => {
                                            onClose();
                                          }, 1000);
                                        }}
                                        isLoading={loading}
                                        loadingText="Approving..."
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        colorScheme="red"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          dispatch(
                                            rejectGuest(id, toast, setLoading)
                                          );
                                          setTimeout(() => {
                                            onClose();
                                          }, 1000);
                                        }}
                                      >
                                        Decline
                                      </Button>
                                    </div>
                                  ) : (
                                    <h2
                                      style={{
                                        fontSize: "16px",
                                        marginTop: "10px",
                                        width: "50%",
                                        height: "100%",
                                        borderRadius: "5px",
                                        border: "1px solid #e6e6e6",
                                        textAlign: "center",
                                        backgroundColor: `${
                                          guestStatus === "Approved"
                                            ? "green"
                                            : "red"
                                        }`,
                                        color: "white",
                                      }}
                                    >
                                      Guest Already {guestStatus}
                                    </h2>
                                  )}
                                </ModalBody>
                              </ModalContent>
                            </Modal>
                          </td>
                          {/* <td>{createdAt.split("T")[0]}</td> */}
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffGuest;
