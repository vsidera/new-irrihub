import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataLogs } from "../../actions/device/deviceAction";
import {useParams} from 'react-router-dom';

const SmartFarm = () => {

  const params = useParams();

  // const imei = params.id
  const imei = 863576044816911

  const [isLoaded, setIsLoaded] = useState(false);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const [activeTab, setActiveTab] = useState(0);

  const [dataLogs, setDataLogs] = useState([])

  const [pumps, setPumps] = useState( [
    { id: "p_s", name: "Pump 1", mode: "manual", status: "ON", sensor: "20C" },
  
  ]);

  const [valves, setValves] = useState( [
    { id: "v1_s", name: "Valve 1", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: "v2_s", name: "Valve 2", mode: "manual", status: "ON" , sensor: "20C"},
    { id: "v3_s", name: "Valve 3", mode: "manual", status: "ON" , sensor: "20C"},
    { id: "v4_s", name: "Valve 4", mode: "manual", status: "ON" , sensor: "20C"},
    { id: "v5_s", name: "Valve 5", mode: "manual", status: "ON" , sensor: "20C"},
    { id: "v6_s", name: "Valve 6", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: "v7_s", name: "Valve 7", mode: "manual", status: "ON" , sensor: "20C"},
    { id: "v8_s", name: "Valve 8", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: "v9_s", name: "Valve 9", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: "v10_s", name: "Valve 10", mode: "manual", status: "OFF" , sensor: "20C"},
  ]);

  const [valvesAuto, setValvesAuto] = useState( [
    { id: "v1_l", name: "Valve 1", mode: "auto", status: "OFF" , sensor: "20C"},
    { id: "v2_l", name: "Valve 2", mode: "auto", status: "ON" , sensor: "20C"},
    { id: "v3_l", name: "Valve 3", mode: "auto", status: "ON" , sensor: "20C"},
    { id: "v4_l", name: "Valve 4", mode: "auto", status: "ON" , sensor: "20C"},
    { id: "v5_l", name: "Valve 5", mode: "auto", status: "ON" , sensor: "20C"},
    { id: "v6_l", name: "Valve 6", mode: "auto", status: "OFF" , sensor: "20C"},
    { id: "v7_l", name: "Valve 7", mode: "auto", status: "ON" , sensor: "20C"},
    { id: "v8_l", name: "Valve 8", mode: "auto", status: "OFF" , sensor: "20C"},
    { id: "v9_l", name: "Valve 9", mode: "auto", status: "OFF" , sensor: "20C"},
    { id: "v10_l", name: "Valve 10", mode: "auto", status: "OFF" , sensor: "20C"},
  ]);


  const getDataLogs = () => {

    deviceDataLogs(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setDataLogs(res.data);
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataLogs();
    setIsLoaded(true)

  }, []);



  

  const handleValveStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (pumps.find((bulb) => bulb.id === id).status !== newStatus) {
      setPumps(
        pumps.map((pump) =>
          pump.id === id ? { ...pump, status: newStatus } : pump
        )
      );
    }
  };

  const handleStatusChangeAndSwitchValve = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (valves.find((valve) => valve.id === id).status !== newStatus) {
      setValves(
        valves.map((valve) =>
          valve.id === id ? { ...valve, status: newStatus } : valve
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

  const handleStatusChangeAndSwitchPump = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (pumps.find((pump) => pump.id === id).status !== newStatus) {
      setPumps(
        pumps.map((pump) =>
          pump.id === id ? { ...pump, status: newStatus } : pump
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      <h1 className="text-2xl text-black mb-6">Smart Farm</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        The Smartest Farm in Africa
      </h4>
      <div className="mt-4">
      <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Manual" />
          <Tab label="Auto" />
        </Tabs>
        {activeTab === 0 && (
          <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pumps-content"
          id="pumps-header"
        >
          <span className="text-lg font-medium"> PUMPS</span>
         
        </AccordionSummary>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {pumps.map((pump) => (
                    <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{pump.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{pump.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                pump.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {pump.status}
                            </span>
                          </p>
                          <Switch
                            checked={pump.status === "ON"}
                            onChange={handleStatusChangeAndSwitchPump(pump.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle pump status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="valves-content"
          id="valves-header"
        > 
        <span className="text-lg font-medium"> VALVES</span>
        </AccordionSummary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {valves.map((valve) => (
                    <div key={valve.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{valve.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{valve.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {valve.status}
                            </span>
                          </p>
                          <Switch
                            checked={valve.status === "ON"}
                            onChange={handleStatusChangeAndSwitchValve(valve.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      </>
        )}
         {activeTab === 1 && (
          <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pumps-content"
          id="pumps-header"
        >
          <span className="text-lg font-medium"> PUMPS</span>
         
        </AccordionSummary>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {pumps.map((pump) => (
                    <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{pump.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{pump.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                pump.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {pump.status}
                            </span>
                          </p>
                         
                        </div>
                        <p className="mr-4">
                      Sensor: <span className="font-medium">{pump.sensor}</span>
                    </p>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="valves-content"
          id="valves-header"
        > 
        <span className="text-lg font-medium"> VALVES</span>
        </AccordionSummary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {valvesAuto.map((valve) => (
                    <div key={valve.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{valve.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{valve.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {valve.status}
                            </span>
                          </p>
                         
                        </div>
                        <p className="mr-4">
                      Sensor: <span className="font-medium">{valve.sensor}</span>
                    </p>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      </>
        )}
    </div>
    </Sidebar>
    </>
  );
};

export default SmartFarm;
