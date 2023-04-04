import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from '@mui/material';
import SnackbarAlert from "../utils/snackbar";
import { userCreate } from "../../actions/user/userAction";

const RegisterUserModal = ({
  registerModal,
  closeRegisterModal,
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
      pin: '',
      type: ''
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
  
      const newUser = {
        mobile_no: state.mobile_no,
        firstname: state.firstname,
        lastname: state.lastname,
        pin: state.pin
      };
  
      const res = userCreate(newUser).then((res) => {
        if (res.status === 201) {
          setEventType('success');
          setEventMessage('User Successfully Created');
          setEventTitle('USER CREATE');
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType('fail');
          setEventMessage('USER NOT Created');
          setEventTitle('USER CREATE');
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
    height: 520,
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
  open={registerModal}
  sx={{ border: "none", boxShadow: "none" }}
  onClose={closeRegisterModal}
>
  <div>
    <Box sx={style}>
      <CardContent style={{ width: "60%" }}>
        <div className="text-center content-center">
          <p className="text-xl">REGISTER USER</p>

          <br />

          <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="my-2">
          
            <select id="user-type" name="user-type" onChange={handleChange} className="w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="CLIENT">CLIENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="mobile_no"
                label="Mobile No"
                variant="outlined"
                className="w-full"
                type="text"
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
                name="pin"
                label="Pin"
                variant="outlined"
                className="w-full"
                type="password"
                value={state.pin}
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
                    {isButtonClicked ? "DONE!" : "REGISTER"}
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

export default RegisterUserModal;
