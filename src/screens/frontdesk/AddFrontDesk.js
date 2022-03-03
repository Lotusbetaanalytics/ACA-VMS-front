import { Button, Input, useToast, Select } from "@chakra-ui/react";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import AutoCompleteContext from "../../context/AutoCompleteContext";
import { createFrontDesk } from "../../redux/actions/frontdesk/frontdesk.auth.actions";
import "./frontdesk.css";
import FilterOffice from "../../components/AutoCompleteOffice";
import { getOffice } from "../../redux/actions/office/office.actions";

const AddFrontDesk = () => {
  const { value, setValue } = React.useContext(AutoCompleteContext);
  const dispatch = useDispatch();
  const toast = useToast();
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [office, setOffice] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [officeSearch, setOfficeSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { firstname, lastname, email, role, password, office: value };
    setLoading(true);
    dispatch(createFrontDesk(data, toast, setLoading));
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole(false);
    setPassword("");
    setValue("");
  };

  const officeSearchHandler = (e) => {
    setOffice(e.target.value);
    dispatch(getOffice(office, setOfficeSearch));
  };

  return (
    <div className="add__frontdesk__container">
      <NavbarFront />
      <div>
        <form className="add__frontdesk__form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="">First Name</label>
            <Input
              value={firstname}
              required
              placeholder="Type first name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <Input
              placeholder="Type last name..."
              value={lastname}
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Mobile Number</label>
            <Input
              placeholder="Type Mobile Number..."
              value={mobile}
              required
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Email Address</label>
            <Input
              value={email}
              required
              placeholder="Type Email Address..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <Input
              placeholder="6 characters minimum"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="">Role</label>
            <Select
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Admin</option>
            </Select>
          </div>
          <div>
            <label htmlFor="">Office</label>
            <FilterOffice
              onChange={officeSearchHandler}
              data={officeSearch}
              value={office}
            />
            {/* <Input /> */}
          </div>
          <>
            <Button
              type="submit"
              colorScheme="green"
              rightIcon={<PersonAdd />}
              isLoading={loading}
              loadingText="Adding..."
            >
              Add Front Desk
            </Button>
          </>
        </form>
      </div>
    </div>
  );
};

export default AddFrontDesk;
