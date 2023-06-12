import React from "react";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField } from '@mui/material';
import SnackbarAlert from "../utils/snackbar";
import { groupCreate, attachDevicetoGroup } from "../../actions/contacts/contactsAction";

const AddGroupModal = ({
  groupCreateModal,
  closeGroupCreateModal
}) => {

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [group_id, setGroup_id] = useState(null)

  const [state, setState] = React.useState({
    name: '',
    description: '',
    user_device_id: '',
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

    const newGroup = {
      name: state.name,
      description: state.description,
    };

    const attachDetails = {
        user_device_id: state.user_device_id,
        group_id: group_id,
      };
  

    const res = groupCreate({newGroup}).then((res) => {
      setGroup_id(res.data.id)
      if (res.status === 201) {

        const attachDetails = {
          user_device_id: state.user_device_id,
          group_id: res.data.id,
        };
        
        console.log("ATTACH DETAILS ARE!!!!!!", attachDetails)
        attachDevicetoGroup(attachDetails).then((rez) =>{
            if(rez.status === 200){
                setEventType('success');
                setEventMessage('Group Successfully Created & Attached');
                setEventTitle('Group CREATE');
                setIsSnackBarAlertOpen(true);

            }else{
                setEventType('fail');
                setEventMessage('Device Not Attached');
                setEventTitle('DEVICE ATTACH');
                setIsSnackBarAlertOpen(true);

            }
        })

      setGroup_id(null)
      } else {
        setEventType('fail');
        setEventMessage('Group NOT Created');
        setEventTitle('Group CREATE');
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
  open={groupCreateModal}
  sx={{ border: "none", boxShadow: "none" }}
  onClose={closeGroupCreateModal}
>
  <div>
    <Box sx={style}>
      <CardContent style={{ width: "60%" }}>
        <div className="text-center content-center">
          <p className="text-xl">CREATE GROUP</p>

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
                name="description"
                label="Description"
                variant="outlined"
                className="w-full"
                value={state.description}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <TextField
                id="outlined-basic"
                name="user_device_id"
                label="Device"
                variant="outlined"
                className="w-full"
                type="number"
                value={state.user_device_id}
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
                    }}
                  >
                    CREATE
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

export default AddGroupModal;
