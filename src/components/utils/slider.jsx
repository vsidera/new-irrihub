import { useState } from 'react';
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { sendCommand } from '../../actions/device/deviceAction';
import SnackbarAlert from './snackbar';

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: green[500],
  height: 8,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: green[500],
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-active': {},
  '& .MuiSlider-valueLabel': {
    left: 'calc(-50% + 4px)',
  },
  '& .MuiSlider-track': {
    height: 8,
    borderRadius: 4,
  },
  '& .MuiSlider-rail': {
    height: 8,
    borderRadius: 4,
  },
}));

function ValveSlider(formValues) {
  const [value, setValue] = useState(50);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {

    const cmdBody = {
      imei: formValues.imei,
      command: formValues.subtopic + `${`_l`}`,
      value: value.toString(),
    };
    sendCommand(cmdBody)
      .then((res) => {
        if (res.status === 200) {
          setEventType("success");
          setEventMessage("Command Successfully Sent");
          setEventTitle("SEND COMMAND");
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType("fail");
          setEventMessage("COMMAND NOT SENT");
          setEventTitle("SEND COMMAND");
          setIsSnackBarAlertOpen(true);
        }
      })
      .catch((err) => console.error(err));

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
    <div className="w-full mx-auto flex items-center mt-2">
      <CustomSlider
        value={value}
        onChange={handleChange}
        aria-labelledby="range-slider"
        step={1}
        marks
        min={0}
        max={100}
      />
      <p className="text-center m-3">{value}</p>
      <button
          className="py-1 px-3 bg-blue-800 hover:bg-green-600 text-white rounded-lg"
          onClick={handleSubmit}
        >Set</button>
    </div>
    </>
  );
}

export default ValveSlider;
