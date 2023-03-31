import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from '@mui/material';
import SnackbarAlert from "../utils/snackbar";
import { contactCreate } from "../../actions/contacts/contactsAction";

const AddCustomerModal = ({
  createModal,
  closeCreateModal
}) => {

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    mobile_no: '',
    firstname: '',
    lastname: '',
    location: ''

  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      mobile_no: state.mobile_no,
      location: state.location,
      attributes: {
        firstname: state.firstname,
        lastname: state.lastname
    },
    };

    const res = contactCreate({newContact}).then((res) => {
      if (res.status === 201) {
        setEventType('success');
        setEventMessage('Customer Successfully Created');
        setEventTitle('CUSTOMER CREATE');
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType('fail');
        setEventMessage('Customer NOT Created');
        setEventTitle('CUSTOMER CREATE');
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 500,
    height: 450,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  return (
    <>
    <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <Modal
  open={createModal}
  sx={{ border: "none", boxShadow: "none" }}
  onClose={closeCreateModal}
>
  <div>
    <Box sx={style}>
      <CardContent style={{ width: "60%" }}>
        <div className="text-center content-center">
          <p className="text-xl">CREATE CUSTOMER</p>

          <br />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="mobile_no"
                label="Mobile No"
                variant="outlined"
                className="w-full"
                type="number"
                value={state.mobile_no}
                onChange={handleChange}
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="firstname"
                label="First Name"
                variant="outlined"
                className="w-full"
                value={state.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="lastname"
                label="Last Name"
                variant="outlined"
                className="w-full"
                value={state.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="lastname"
                label="Location"
                variant="outlined"
                className="w-full"
                value={state.location}
                onChange={handleChange}
              />
            </div>

            <button
                    className="bg-blue-900 text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{
                      marginTop: "2rem",
                      alignSelf: "center",
                      ...(isButtonClicked ? greenButton : {}),
                    }}
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsButtonClicked(true);
                    }}
                  >
                    {isButtonClicked ? "DONE!" : "CREATE"}
                  </button>
          </div>
        </div>
      </CardContent>
    </Box>
  </div>
</Modal>

    </>
  );
};

export default AddCustomerModal;
