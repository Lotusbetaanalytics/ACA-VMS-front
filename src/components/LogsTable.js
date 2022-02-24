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
  Button,
} from "@chakra-ui/react";

import Moment from "react-moment";
import "moment-timezone";
import _ from "lodash";

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

function LogTable({ data }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [object, setObject] = React.useState({});
  function handleClick(event, rowData) {
    setObject(rowData);
    onOpen();
  }

  return (
    <>
      <MaterialTable
        title="Visitor Logs"
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
              <tbody style={{ textAlign: "left", width: "100%" }}>
                <tr>
                  <th>Title:</th>
                  <td>{object.title}</td>
                </tr>
                <tr>
                  <th>Full Name:</th>
                  <td>
                    <td>{object["fullname"]}</td>
                  </td>
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
                {object.status === "Pending" ? (
                  <Button colorScheme="green" mt={4}>
                    Check In Guest
                  </Button>
                ) : (
                  <Button colorScheme="green" mt={4}>
                    Check Out Guest
                  </Button>
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
