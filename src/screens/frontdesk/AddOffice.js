import { Button, Input, useToast } from "@chakra-ui/react";
import { AddTwoTone, HouseTwoTone } from "@material-ui/icons";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import NavbarFront from "../../components/NavbarFront/NavbarFront";
import ViewOffices from "../../components/ViewOffice";
import { addOffice } from "../../redux/actions/office/office.actions";
import { BASE_URL } from "../../redux/constants/constants";
import "./frontdesk.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const AddOffice = () => {
  // const [showTable, setShowTable] = React.useState(false);
  const [officeData, setOfficeData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/office`)
      .then((res) => {
        setOfficeData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <NavbarFront />
      <div className="add__office__container">
        <div style={{ marginTop: "30px" }}>
          <TransitionsModal />
        </div>
        <div className="view__office">
          <ViewOffices data={officeData} title="All Companies" />
        </div>
      </div>
    </div>
  );
};

export default AddOffice;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function TransitionsModal() {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [office, setOfficeName] = React.useState("");
  const [logo, setLogo] = React.useState(null);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("logo", logo);
    data.append("office", office);
    dispatch(addOffice(data, setLoading, toast));
    setOfficeName("");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} rightIcon={<AddTwoTone />}>
        Add New Company
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="">Company Name</label>
                <Input
                  placeholder="Type company name..."
                  value={office}
                  required
                  onChange={(e) => setOfficeName(e.target.value)}
                  my={2}
                />
              </div>
              <div>
                <label htmlFor="file">
                  <span>
                    Add Company Logo
                    <UploadFile />
                  </span>
                </label>
                <Input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setLogo(e.target.files[0]);
                  }}
                />
                {logo && (
                  <div className="share__preview__container">
                    <img
                      className="share__img__preview"
                      src={URL.createObjectURL(logo)}
                      alt=""
                      style={{ width: "20%" }}
                    />
                    {/* <Cancel
                      className="share__cancel"
                      onClick={() => setLogo(null)}
                    /> */}
                  </div>
                )}
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
                Add Company
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
