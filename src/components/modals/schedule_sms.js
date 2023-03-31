import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField, TextareaAutosize } from "@mui/material";
import SnackbarAlert from "../utils/snackbar";
import { sendSms } from "../../actions/messages/messagesAction"
import MaterialUIPickers from "../utils/timePicker";
import { v4 as uuidv4 } from 'uuid';

const ScheduleModal = ({ scheduleModal, closeSendModal }) => {

const randomUuid = uuidv4();

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    mobile_no: '',
    message: '',

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

    const newSms = {
        destination: state.mobile_no,
        content: state.message,
        requestid: randomUuid,
        "scheduled":"2023-03-22T06:31:05"
    };

    const res = sendSms(newSms).then((res) => {
      if (res.status === 202) {
        setEventType('success');
        setEventMessage(res.data.status_desc);
        setEventTitle('MESSAGE SEND');
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType('fail');
        setEventMessage('FAILED to send message!');
        setEventTitle('MESSAGE SEND');
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
        open={scheduleModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeSendModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">SEND SCHEDULED SMS</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="my-2">
                    <TextField
                      id="mobileNo"
                      name="mobile_no"
                      label="Mobile No"
                      variant="outlined"
                      type="number"
                      value={state.mobile_no}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <div className="my-2">
                    <TextareaAutosize
                      id="content"
                      aria-label="empty textarea"
                      placeholder="Type your message here"
                      value={state.content}
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
                  <div className="my-2">
                    <MaterialUIPickers/>
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
                    {isButtonClicked ? "DONE!" : "SEND"}
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

export default ScheduleModal;