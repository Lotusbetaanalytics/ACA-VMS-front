import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import "./screen.styles.css";
import { CameraFront } from "@material-ui/icons";
import { findStaff } from "../redux/actions/staff/staff.auth.action";
import { useDispatch } from "react-redux";
import { addGuest } from "../redux/actions/guest/guest.actions";
import { getOffice } from "../redux/actions/office/office.actions";
import FilterOffice from "../components/AutoCompleteOffice";
import AutoCompleteContext from "../context/AutoCompleteContext";
import "./staff/staff.css";
import io from "socket.io-client";
const socket = io.connect("https://acavms.herokuapp.com/");
const NewGuest = () => {
  const { value, setValue } = React.useContext(AutoCompleteContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photo, setPhoto] = React.useState("");
  const [staffId, setStaffId] = React.useState("");
  const [staffName, setStaffName] = React.useState("");
  const [office, setOffice] = React.useState("");
  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setPhone] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [isGroup, setIsGroup] = React.useState(false);
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
      email,
      mobile,
      title,
      company,
      purpose,
      office: value,
      isGroup,
      photo,
    };
    dispatch(addGuest(data, toast, setLoading));
    setFullName("");
    setEmail("");
    setPhone("");
    setTitle("");
    setCompany("");
    setPurpose("");
    setOffice("");
    setIsGroup(false);
    setPhoto("");
    setStaffId("");
    setStaffName("");
    setValue("");
    socket.emit("message", "New Guest");
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
            <label htmlFor="">Title</label>
            <Select
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr.</option>
            </Select>
          </div>
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
            <label htmlFor="">Company</label>
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
            <Input
              type="text"
              value={purpose}
              required
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
            />
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
          <div>
            <label htmlFor="">Email Address</label>
            <Input
              type="text"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Part of a Group?</label>
            <Select
              onChange={(e) => {
                setIsGroup(e.target.value);
              }}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </Select>
          </div>
          <div className="takephoto">
            <div className="visitor__photo">
              <Button
                onClick={onOpen}
                my={3}
                rightIcon={<CameraFront />}
                colorScheme="orange"
              >
                Take visitor Photo
              </Button>
              <img src={photo} alt="" />
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size="sm">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Take Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div style={{ margin: "auto auto", paddingLeft: "10px" }}>
                    <WebcamComponent setPhoto={setPhoto} onClose={onClose} />
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
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

export default NewGuest;

export const WebcamComponent = ({ setPhoto, onClose }) => {
  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    localStorage.setItem("photo", imageSrc);
    onClose();
  }, [webcamRef, setPhoto, onClose]);

  return (
    <>
      <Webcam
        audio={false}
        mirrored={true}
        // height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={1280}
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        style={{
          float: "right",
          marginRight: "20px",
          marginTop: "10px",
          backgroundColor: "green",
          borderRadius: "5%",
          padding: "10px",
          color: "#fff",
        }}
      >
        Take photo
      </button>
    </>
  );
};
