import MaterialTable from "material-table";
import { forwardRef } from "react";
import React from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import _ from "lodash";
import { BASE_URL } from "../redux/constants/constants";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// export function ShowDetails() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       <Button onClick={onOpen}>Open Modal</Button>

//   );
// }

function LogTable({ data, title = "Visitors Logs" }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [object, setObject] = React.useState({});
  const [tagNumber, setTagNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  function handleClick(event, rowData) {
    setObject(rowData);
    console.log(selectedRow);
    onOpen();
  }

  const toast = useToast();

  const handleTagNumber = (event) => {
    setTagNumber(event.target.value);
  };

  const checkedInHandler = (id) => {
    setIsLoading(true);
    axios
      .patch(`${BASE_URL}/guest/checkin/${id}`)
      .then((res) => {
        setIsLoading(false);
        toast({
          title: "Check In Success ✔",
          description: "Guest Checked In",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setTagNumber("");
        setTimeout(() => {
          // onClose();
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Check In Failed ❌",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const checkedOutHandler = (id) => {
    setIsLoading(true);
    axios
      .patch(`${BASE_URL}/guest/checkout/${id}`)
      .then((res) => {
        setIsLoading(false);
        toast({
          title: "Check Out Success ✔",
          description: "Guest Checked Out",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setTagNumber("");
        setTimeout(() => {
          // onClose();
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Check Out Failed ❌",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <>
      <MaterialTable
        title={title}
        data={data}
        columns={[
          { title: "Title", field: "title" },
          { title: "Full Name", field: "fullname" },
          { title: "Company", field: "company" },
          { title: "Purpose of Visit", field: "purpose" },
          { title: "Host", field: "host[fullname]" },
          { title: "Status", field: "status" },
        ]}
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow.tableData.id);
          handleClick(evt, selectedRow);
        }}
        options={{
          exportButton: true,
          filtering: true,
          rowStyle: {},
          headerStyle: {
            backgroundColor: "#009c84",
            width: "100%",
            height: "100%",
            color: "#fff",
          },
        }}
        icons={tableIcons}
        style={{
          color: "#000",
          fontFamily: "inherit",
          padding: "10px",
          width: "95%",
          marginTop: "60px",
          border: "none",
          boxShadow: "none",
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Guest Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <table>
              <tbody
                style={{ textAlign: "left", width: "100%" }}
                className="guest__table__log"
              >
                <tr>
                  <th>Title:</th>
                  <td>{object.title}</td>
                </tr>
                <tr>
                  <th>Full Name:</th>
                  <td>{object["fullname"]}</td>
                </tr>
                <tr>
                  <th>Company:</th>
                  <td>{_.capitalize(object["company"])}</td>
                </tr>
                <tr>
                  <th>Purpose of Visit:</th>
                  <td>{_.capitalize(object["purpose"])}</td>
                </tr>
                <tr>
                  <th>Date and Time of Visit:</th>
                  <td>
                    <Moment>{object["createdAt"]}</Moment>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <div className="guest__image">
                <img
                  src={object.photo}
                  alt="guest"
                  style={{ width: "300px" }}
                />
              </div>
              <div>
                {object.status === "Pending" && <h2>Awaiting Host</h2>}
                {object.status === "Approved" && !object.checkedIn ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      checkedInHandler(object._id);
                    }}
                  >
                    <div style={{ width: "200px" }}>
                      <label htmlFor="">Tag Number</label>
                      <Input
                        placeholder="Tag Number"
                        value={tagNumber}
                        required
                        onChange={handleTagNumber}
                      />
                    </div>
                    <Button
                      colorScheme="green"
                      mt={4}
                      isLoading={isLoading}
                      loadingText="Checking In..."
                      type="submit"
                    >
                      Check In Guest
                    </Button>
                  </form>
                ) : (
                  ""
                )}
                {object.checkedIn && !object.checkedOut ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      checkedOutHandler(object._id);
                    }}
                  >
                    <div style={{ width: "200px" }}>
                      <label htmlFor="">Tag Number</label>
                      <Input
                        placeholder="Tag Number"
                        value={tagNumber}
                        required
                        onChange={handleTagNumber}
                      />
                    </div>
                    <Button
                      colorScheme="green"
                      mt={4}
                      isLoading={isLoading}
                      loadingText="Checking Out..."
                      type="submit"
                    >
                      Check Out
                    </Button>
                  </form>
                ) : (
                  ""
                )}
                {object.status === "Rejected" && (
                  <h2>Sorry! Your Host has refused to meet you!</h2>
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogTable;
