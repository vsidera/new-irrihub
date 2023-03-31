import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from '@mui/material';
import SnackbarAlert from "../utils/snackbar";
import { appCreate } from "../../actions/applications/appsActions";

const CreateAppModal = ({
  createAppModal,
  closeCreateAppModal,
}) => {

    const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
    const [eventType, setEventType] = useState('');
    const [eventMessage, setEventMessage] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
  
    const [state, setState] = React.useState({
      name: '',
      secret: '',
      email: '',
      country_code: ''
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
  
      const newApp = {
        name: state.name,
        secret: state.secret,
        email: state.email,
        country_code: state.country_code
      };
  
      const res = appCreate(newApp).then((res) => {
        if (res.status === 201) {
          setEventType('success');
          setEventMessage('Org Successfully Created');
          setEventTitle('APP CREATE');
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType('fail');
          setEventMessage('Org NOT Created');
          setEventTitle('APP CREATE');
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
  open={createAppModal}
  sx={{ border: "none", boxShadow: "none" }}
  onClose={closeCreateAppModal}
>
  <div>
    <Box sx={style}>
      <CardContent style={{ width: "60%" }}>
        <div className="text-center content-center">
          <p className="text-xl">CREATE ORGANISATION</p>

          <br />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="name"
                label="Name"
                variant="outlined"
                className="w-full"
                type="text"
                value={state.name}
                onChange={handleChange}
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="secret"
                label="Password"
                variant="outlined"
                className="w-full"
                type="password"
                value={state.secret}
                onChange={handleChange}
              />
            </div>

            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                className="w-full"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="country_code"
                label="Country Code"
                variant="outlined"
                className="w-full"
                value={state.country_code}
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

export default CreateAppModal;
