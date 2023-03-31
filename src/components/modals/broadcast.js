import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField, TextareaAutosize } from "@mui/material";
import SnackbarAlert from "../utils/snackbar";
import { broadcastMessages } from "../../actions/messages/messagesAction";

const BroadcastModal = ({ broadcastModal, closeBroadcastModal }) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    requestid: "",
    content: "",
    scheduled: "",
    destinations: [],
  });

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSms = {
      mobile_no: state.mobile_no,
      message: state.message,
    };

    const res = broadcastMessages(newSms).then((res) => {
      if (res.status === 404) {
        setEventType("success");
        setEventMessage("Bulk SMS Sent");
        setEventTitle("BROADCAST");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("success");
        setEventMessage("Bulk SMS Sent");
        setEventTitle("BROADCAST");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 600,
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
        open={broadcastModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeBroadcastModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">SEND BULK SMS</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <div className="my-2">
                    <TextField
                      id="mobileNo"
                      label="Mobile No"
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={state.mobile_no}
                      onChange={handleChange}
                    />
                  </div> */}
                  <div className="my-2">
                    <TextareaAutosize
                      aria-label="empty textarea"
                      placeholder="Type your message here"
                      value={state.message}
                      onChange={handleChange}
                      minRows={3}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
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
                    {isButtonClicked ? "SUBMITTED" : "SUBMIT"}
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

export default BroadcastModal;
