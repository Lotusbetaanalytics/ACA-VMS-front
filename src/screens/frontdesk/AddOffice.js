import { Button, Input, useToast } from "@chakra-ui/react";
import { HouseTwoTone } from "@material-ui/icons";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import ViewOffices from "../../components/ViewOffice";
import { addOffice } from "../../redux/actions/office/office.actions";
import { BASE_URL } from "../../redux/constants/constants";
import "./frontdesk.css";

const AddOffice = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [office, setOfficeName] = React.useState("");
  const [showTable, setShowTable] = React.useState(false);
  const [officeData, setOfficeData] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { office };
    dispatch(addOffice(data, setLoading, toast));
    setOfficeName("");
  };

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/office`)
      .then((res) => {
        console.log(res.data.data);
        setOfficeData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showTable]);
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
              my={2}
            />
          </div>
          <div>
            <label htmlFor="file">
              <span>
                Add Office Logo
                <UploadFile />
              </span>
            </label>
            <Input
              style={{ visibility: "hidden" }}
              type="file"
              id="file"
              placeholder="Type office name..."
            />
          </div>
          <Button
            type="submit"
            isLoading={loading}
            loadingText="Adding office..."
            colorScheme="whatsapp"
            rightIcon={<HouseTwoTone />}
            mt={2}
            py={3}
          >
            Add Office
          </Button>
        </form>
        <div className="view__office">
          <Button
            onClick={() => {
              setShowTable(!showTable);
            }}
          >
            {showTable ? "Hide List of Offices" : "See List of Offices"}
          </Button>
          {showTable ? <ViewOffices data={officeData} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default AddOffice;
