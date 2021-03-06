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

function StaffLogTable({ data }) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [object, setObject] = React.useState({});
  function handleClick(event, rowData) {
    setObject(rowData);
    console.log(selectedRow);
    onOpen();
  }

  const frontdesk = JSON.parse(localStorage.getItem("frontdesk")).user
    .isSuperAdmin;

  return (
    <>
      <MaterialTable
        title="All Staff"
        data={data}
        columns={[
          { title: "Full Name", field: "fullname" },
          { title: "Email Address", field: "email" },
          { title: "Mobile Number", field: "mobile" },
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
          <ModalHeader>Staff Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <table>
              <tbody
                style={{ textAlign: "left", width: "100%" }}
                className="guest__table__log"
              >
                <tr>
                  <th>Full Name:</th>
                  <td>
                    <td>{object["fullname"]}</td>
                  </td>
                </tr>
                <tr>
                  <th>Email Address:</th>
                  <td>{object["email"]}</td>
                </tr>
              </tbody>
              <tr>
                <th>Mobile Number:</th>
                <td>{object["mobile"]}</td>
              </tr>
              {frontdesk && (
                <tr>
                  <th>Office:</th>
                  <td>{object["office"]}</td>
                </tr>
              )}
            </table>
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

export default StaffLogTable;
