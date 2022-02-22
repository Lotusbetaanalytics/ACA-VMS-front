import { Button, Input, useToast } from "@chakra-ui/react";
import { HouseTwoTone, LocalPostOfficeSharp } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import { addOffice } from "../../redux/actions/office/office.actions";
import "./frontdesk.css";

const AddOffice = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [office, setOfficeName] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { office };
    dispatch(addOffice(data, setLoading, toast));
    setOfficeName("");
  };
  return (
    <div>
      <NavbarFront />
      <div className="add__office__container">
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Office name</label>
            <Input
              placeholder="Type office name..."
              value={office}
              onChange={(e) => setOfficeName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="file">Office Logo</label>
            <Input type="file" id="file" placeholder="Type office name..." />
          </div>
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Adding office..."
            colorScheme="whatsapp"
            rightIcon={<HouseTwoTone />}
          >
            Add Office
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddOffice;
