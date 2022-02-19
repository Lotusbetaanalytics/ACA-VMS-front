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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import "./staff.css";
import { getStaffGuest } from "../../redux/actions/guest/guest.actions";
import { useDispatch } from "react-redux";

const StaffGuest = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userPhoto, setUserPhoto] = React.useState("");

  const clickHandler = (event) => {
    onOpen();
    setUserPhoto(event.target.src);
  };
  React.useEffect(() => {
    setLoading(true);
    dispatch(getStaffGuest(setData, setLoading));
  }, [dispatch]);

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
                            <img src={photo} alt="" />
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
                                  padding: "20px",
                                }}
                              >
                                <img src={userPhoto} alt="" />
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
