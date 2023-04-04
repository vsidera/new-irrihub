import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from "@mui/material";
import { serviceCreate } from "../../actions/device/deviceAction";
import SnackbarAlert from "../utils/snackbar";

const CreateDeviceModal = ({
  deviceModal,
  closeDeviceModal,
}) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    sender: "",
    provider: "",
    country_code: "",
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

    const newService = {
      sender: state.sender,
      provider: state.provider,
      country_code: state.country_code,
    };

    const res = serviceCreate(newService).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Device Successfully Created");
        setEventTitle("DEVICE CREATE");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Device NOT Created");
        setEventTitle("DEVICE CREATE");
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
        open={deviceModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeDeviceModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">CREATE DEVICE</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="my-2">
                    <TextField
                      id="outlined-basic"
                      name="sender"
                      label="NAME"
                      variant="outlined"
                      className="w-full"
                      type="text"
                      value={state.sender}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="my-2">
                    <TextField
                      id="outlined-basic"
                      name="provider"
                      label="OWNER"
                      variant="outlined"
                      className="w-full"
                      value={state.provider}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="my-2">
                    <TextField
                      id="outlined-basic"
                      name="country_code"
                      label="LOCATION"
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

export default CreateDeviceModal;
