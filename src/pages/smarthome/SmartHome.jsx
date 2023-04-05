import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";

const SmartFarm = () => {

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const [bulbs, setBulbs] = useState([
    { id: "b1", name: "Bulb 1", uuid:"b1", mode: "manual", status: "ON", sensor: "20C" },
    { id: "b2", name: "Bulb 2", uuid:"b2", mode: "manual", status: "OFF" ,sensor: "20C"},
    { id: "b3", name: "Bulb 3", uuid:"b3", mode: "manual", status: "OFF", sensor: "20C" },
    { id: "b4", name: "Bulb 2", uuid:"b4", mode: "manual", status: "ON",sensor: "20C" },
  ]);

  // const handleStatusChange = (id) => (event) => {
  //   const newStatus = event.target.checked ? "ON" : "OFF";
  //   if (bulbs.find((bulb) => bulb.id === id).status !== newStatus) {
  //     setBulbs(
  //       bulbs.map((bulb) =>
  //         bulb.id === id ? { ...bulb, status: newStatus } : bulb
  //       )
  //     );
  //   }
  // };

  // const handleSwitch = (e) => {
  //   e.preventDefault();

  //   const cmdBody = 
  //     {
  //       "imei": "863576044816911",
  //       "command": "p_s",
  //       "value": "1"
  //   };
    
  //   const res = sendCommand(cmdBody).then((res) => {
  //     if (res.status === 200) {
  //       setEventType('success');
  //       setEventMessage('Org Successfully Created');
  //       setEventTitle('APP CREATE');
  //       setIsSnackBarAlertOpen(true);
  //     } else {
  //       setEventType('fail');
  //       setEventMessage('Org NOT Created');
  //       setEventTitle('APP CREATE');
  //       setIsSnackBarAlertOpen(true);
  //     }
  //   });

  //   return res;
  // };

  const handleStatusChangeAndSwitch = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (bulbs.find((bulb) => bulb.id === id).status !== newStatus) {
      setBulbs(
        bulbs.map((bulb) =>
          bulb.id === id ? { ...bulb, status: newStatus } : bulb
        )
      );
      const cmdBody = 
      {
        "imei": "863576044816911",
        "command": id,
        "value": newStatus === "ON" ? "1" : "0"
      };
      sendCommand(cmdBody).then((res) => {
        if (res.status === 200) {
          setEventType('success');
          setEventMessage('Command Successfully Sent');
          setEventTitle('SEND COMMAND');
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType('fail');
          setEventMessage('COMMAND NOT SENT');
          setEventTitle('SEND COMMAND');
          setIsSnackBarAlertOpen(true);
        }
      });
    }
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
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Home</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        The Smartest Home in Africa
      </h4>
      <div className="mt-4">
     
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="pumps-content"
              id="pumps-header"
            >
              <span className="text-lg font-medium"> BULBS</span>
            </AccordionSummary>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
              {bulbs.map((bulb) => (
                <div
                  key={bulb.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2"
                >
                  <h4 className="text-lg font-normal mb-2">{bulb.name}</h4>
                  <div className="flex items-center">
                    <p className="mr-4">
                      Mode: <span className="font-medium">{bulb.mode}</span>
                    </p>
                    <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            bulb.status === "ON"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-bold"
                          }
                        >
                          {bulb.status}
                        </span>
                      </p>
                      <Switch
                        checked={bulb.status === "ON"}
                        onChange={handleStatusChangeAndSwitch(bulb.id)}
                        color="primary"
                        inputProps={{ "aria-label": "toggle bulb status" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        
      </div>
    </Sidebar>
    </>
  );
};

export default SmartFarm;
