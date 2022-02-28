import React from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { findStaff } from "../../redux/actions/staff/staff.auth.action";
import { useDispatch } from "react-redux";
import { addGuest } from "../../redux/actions/guest/guest.actions";
import { getOffice } from "../../redux/actions/office/office.actions";
import FilterOffice from "../../components/AutoCompleteOffice";
import AutoCompleteContext from "../../context/AutoCompleteContext";
import "./staff.css";

const NewDelivery = () => {
  const { value, setValue } = React.useContext(AutoCompleteContext);
  const [staffId, setStaffId] = React.useState("");
  const [staffName, setStaffName] = React.useState("");
  const [office, setOffice] = React.useState("");
  const [fullname, setFullName] = React.useState("");

  const [mobile, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [purpose, setPurpose] = React.useState("Delivery");
  const [staffSearch, setStaffSearch] = React.useState([]);
  const [officeSearch, setOfficeSearch] = React.useState([]);
  const [res, setRes] = React.useState("");
  // const [officeRes, setOfficeRes] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const staffSearchHandler = (e) => {
    setStaffName(e.target.value);
    dispatch(findStaff(staffName, setStaffSearch, value));
  };

  const officeSearchHandler = (e) => {
    setOffice(e.target.value);
    dispatch(getOffice(office, setOfficeSearch, setShow));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      fullname,
      host: staffId,
      company,
      purpose,
      office: value,
    };
    dispatch(addGuest(data, toast, setLoading));
    setFullName("");
    setPhone("");
    setCompany("");
    setPurpose("");
    setOffice("");
    setStaffId("");
    setStaffName("");
    setValue("");
  };

  React.useEffect(() => {
    setRes(
      staffSearch.map(({ _id, fullname }) => {
        return (
          <div key={_id}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setStaffId(_id);
                setStaffName(fullname);
                setRes("");
              }}
              style={{
                backgroundColor: "#ccc",
                padding: "10px",
                width: "100%",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              {fullname.toUpperCase()}
            </button>
          </div>
        );
      })
    );
  }, [staffSearch, value]);

  // React.useEffect(() => {
  //   setOfficeRes(
  //     officeSearch.map(({ _id, office }) => {
  //       return (
  //         <div key={_id} style={{ overflowY: "scroll", height: "200px" }}>
  //           <button
  //             onClick={(e) => {
  //               e.preventDefault();
  //               setOffice(office);
  //               setOfficeRes("");
  //             }}
  //             style={{
  //               backgroundColor: "#ccc",
  //               padding: "10px",
  //               width: "100%",
  //               textAlign: "left",
  //               marginTop: "10px",
  //             }}
  //           >
  //             {office.toUpperCase()}
  //           </button>
  //         </div>
  //       );
  //     })
  //   );
  // }, [officeSearch]);

  // React.useEffect(() => {
  //   console.log(value, id, "value");
  // }, [value, id]);

  return (
    <>
      <form className="newguest__staff" onSubmit={submitHandler}>
        <div className="newguest__form__container">
          <div>
            <label htmlFor="">Full name</label>
            <Input
              type="text"
              value={fullname}
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Delivery Company</label>
            <Input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Purpose of Visit</label>
            <Input type="text" value={purpose} readOnly />
          </div>
          <div>
            <label htmlFor="">Mobile Number</label>
            <Input
              type="text"
              value={mobile}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="staff__information__container">
          <h2>Staff to see</h2>
          <div className="staff__information">
            <div>
              <label htmlFor="">Staff Office</label>
              {/* <Input
                type="text"
                required
                onChange={officeSearchHandler}
                value={office}
              />
              {office ? officeRes : ""} */}
              <FilterOffice
                data={officeSearch}
                onChange={officeSearchHandler}
                value={office}
              />
            </div>
            {show ? (
              <div>
                <label htmlFor="">Name of Staff</label>
                <Input
                  type="text"
                  value={staffName}
                  required
                  onChange={staffSearchHandler}
                />
                {staffName ? res : ""}
                {/* <Filter
                data={staffSearch}
                onChange={staffSearchHandler}
                value={office}
              /> */}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div>
          <Button
            type="submit"
            mt={4}
            colorScheme="green"
            // size={"lg"}
            // variant="outline"
            isLoading={loading}
            loadingText="Adding Guest..."
          >
            Add New Guest
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewDelivery;
