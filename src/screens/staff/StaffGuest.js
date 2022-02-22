import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
} from "@chakra-ui/react";
import "./staff.css";
import {
  approveGuest,
  getStaffGuest,
  rejectGuest,
} from "../../redux/actions/guest/guest.actions";
import { useDispatch } from "react-redux";

const StaffGuest = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userPhoto, setUserPhoto] = React.useState("");
  const [id, setId] = React.useState("");
  const [guestStatus, setGuestStatus] = React.useState("Pending");

  const toast = useToast();
  const clickHandler = (event) => {
    onOpen();
    setUserPhoto(event.target.src);
    setId(event.target.id);
    setGuestStatus(event.target.alt);
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch(getStaffGuest(setData, setLoading));
  }, [dispatch, guestStatus]);

  return (
    <div className="staff__guest_container">
      <Navbar />
      <div className="staff__guest__contents">
        {loading ? (
          <div className="loader">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Full Name</Th>
                <Th>Mobile Number</Th>
                <Th>Email Address</Th>
                <Th>Purpose of Visit</Th>
                <Th>Company</Th>
                <Th>Status</Th>
                <Th>Photo</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length < 0 ? (
                <Tr>
                  <Td>No Guest!</Td>
                </Tr>
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
                      <Tr key={_id}>
                        <Td>{title}</Td>
                        <Td>{fullname}</Td>
                        <Td>{mobile}</Td>
                        <Td>{email}</Td>
                        <Td>{purpose}</Td>
                        <Td>{company}</Td>
                        <Td>{status}</Td>
                        <Td>
                          <div
                            onClick={clickHandler}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={photo} alt={status} id={_id} />
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
                        </Td>
                        <Td>{createdAt.split("T")[0]}</Td>
                      </Tr>
                    );
                  }
                )
              )}
            </Tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StaffGuest;
