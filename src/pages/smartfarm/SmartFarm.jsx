import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataState } from "../../actions/device/deviceAction";
import {useParams} from 'react-router-dom';

const SmartFarm = () => {

  const params = useParams();

  const imei = params.id
  

  const [isLoaded, setIsLoaded] = useState(false);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const [auto, setAuto] = useState(false)

  const [pumpMode, setPumpMode] = useState("0")

  const [activeTab, setActiveTab] = useState(0);

  const [pumps, setPumps] = useState( [
    // { id: "p_s", name: "Pump 1", mode: "manual", status: "ON", sensor: "20C" },
  
  ]);


  const [pumpsAuto, setPumpsAuto] = useState([])

  console.log("PUMPS ARE!!!!!",pumpsAuto)

  

  const [valves, setValves] = useState(
     [
    // { id: "v1_s", name: "Valve 1", mode: "manual", status: "OFF" , sensor: "20C"},
    // { id: "v2_s", name: "Valve 2", mode: "manual", status: "ON" , sensor: "20C"},
    // { id: "v3_s", name: "Valve 3", mode: "manual", status: "ON" , sensor: "20C"},
    // { id: "v4_s", name: "Valve 4", mode: "manual", status: "ON" , sensor: "20C"},
    // { id: "v5_s", name: "Valve 5", mode: "manual", status: "ON" , sensor: "20C"},
    // { id: "v6_s", name: "Valve 6", mode: "manual", status: "OFF" , sensor: "20C"},
    // { id: "v7_s", name: "Valve 7", mode: "manual", status: "ON" , sensor: "20C"},
    // { id: "v8_s", name: "Valve 8", mode: "manual", status: "OFF" , sensor: "20C"},
    // { id: "v9_s", name: "Valve 9", mode: "manual", status: "OFF" , sensor: "20C"},
    // { id: "v10_s", name: "Valve 10", mode: "manual", status: "OFF" , sensor: "20C"},
  ]
  );

  const [valvesAuto, setValvesAuto] = useState( [

    // { id: "v1_l", name: "Valve 1", mode: "auto", status: "OFF" , sensor: "20C"},
    // { id: "v2_l", name: "Valve 2", mode: "auto", status: "ON" , sensor: "20C"},
    // { id: "v3_l", name: "Valve 3", mode: "auto", status: "ON" , sensor: "20C"},
    // { id: "v4_l", name: "Valve 4", mode: "auto", status: "ON" , sensor: "20C"},
    // { id: "v5_l", name: "Valve 5", mode: "auto", status: "ON" , sensor: "20C"},
    // { id: "v6_l", name: "Valve 6", mode: "auto", status: "OFF" , sensor: "20C"},
    // { id: "v7_l", name: "Valve 7", mode: "auto", status: "ON" , sensor: "20C"},
    // { id: "v8_l", name: "Valve 8", mode: "auto", status: "OFF" , sensor: "20C"},
    // { id: "v9_l", name: "Valve 9", mode: "auto", status: "OFF" , sensor: "20C"},
    // { id: "v10_l", name: "Valve 10", mode: "auto", status: "OFF" , sensor: "20C"},
  ]
  );


  const getDataState = () => {

    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          const valvesManual = res.data.filter(obj => ['v1_s', 'v2_s', 'v3_s', 'v4_s','v5_s','v6_s','v7_s','v8_s','v9_s','v10_s',].includes(obj.subtopic));
          const valvesAuto = res.data.filter(obj => ['v1_l', 'v2_l', 'v3_l', 'v4_l','v5_l','v6_l','v7_l','v8_l','v9_l','v10_l',].includes(obj.subtopic));
          const pumps = res.data.filter(obj => ['p_s'].includes(obj.subtopic));
          const pumpsAuto = res.data.filter(obj => ['p_m'].includes(obj.subtopic));

          
          // console.log("PUMPS MODE!!!!", pumps)
          setValves(valvesManual);
          setValvesAuto(valvesAuto)
          setPumps(pumps)
          setPumpsAuto(pumpsAuto)
          if (pumpsAuto && pumpsAuto[0] && pumpsAuto[0].value==="1"){
            console.log("ITS ON AUTO!!!!!", pumpsAuto[0].value)
            setPumpMode("1")
            pumps[0]["mode"] = "1";
            setAuto(true)
          }
          else{
            console.log("ITS ON MANUAL!!!!!")
            setAuto(false)
            pumps[0]["mode"] = "0";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataState();
    setIsLoaded(true)

  }, []);


 console.log("auto is!!!!!", pumps)
  

  const handleValveStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (pumps.find((valve) => valve.id === id).status !== newStatus) {
      setPumps(
        pumps.map((pump) =>
          pump.id === id ? { ...pump, status: newStatus } : pump
        )
      );
    }
  };

  const handleStatusChangeAndSwitchValve = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const valve = valves.find((valve) => valve.subtopic === subtopic);
  
    if (valve.value !== newValue) {
      setValves(
        valves.map((b) => (b.subtopic === subtopic ? { ...b, value: newValue } : b))
      );
  
      const cmdBody = {
        imei: imei,
        command: subtopic,
        value: newValue.toString(),
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
    }
  };

  const handleStatusChangeAndSwitchPump = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const pump = pumps.find((pump) => pump.subtopic === subtopic);
  
    if (pump.value !== newValue) {
      setPumps(
        pumps.map((b) => (b.subtopic === subtopic ? { ...b, value: newValue } : b))
      );
  
      const cmdBody = {
        imei: imei,
        command: subtopic,
        value: newValue.toString(),
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
    }
  };

  const handleModeChangeAndSwitchPump = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newMode = isChecked ? "1" : "0";
    const pump = pumps.find((pump) => pump.subtopic === subtopic);

    console.log("PUMP MODE", pumpMode, newMode)
  
    if (pump.mode !== newMode) {
      setPumps(
        pumps.map((b) =>
          b.subtopic === subtopic ? { ...b, mode: newMode } : b
        )
      );
  
      const cmdBody = {
        imei: imei,
        command: "p_m",
        value: newMode.toString(),
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
    }
  };
       
  

  const handleStatusChangeAndSwitchPumpAuto = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const pump = pumpsAuto.find((pump) => pump.subtopic === subtopic);
  
    if (pump.value !== newValue) {
      setPumpsAuto(
        pumpsAuto.map((b) => (b.subtopic === subtopic ? { ...b, value: newValue } : b))
      );
  
      const cmdBody = {
        imei: imei,
        command: subtopic,
        value: newValue.toString(),
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

  {auto === false && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
      {pumps &&
        pumps.map((pump) => (
          <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
          <h4 className="text-lg font-normal mb-2">{pump.device_imei}</h4>
          <p className="mr-4">
              Subtopic:{" "}
              <span className="font-medium">{pump.subtopic}</span>
            </p>
          <div className="flex items-center">
            
            <div className="flex items-center">
              
              <div className="flex items-center">
                <p className="mr-4">
                  Status:{" "}
                  <span
                    className={
                      pump.value === "1"
                        ? "text-green-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {pump.value === "1" ? "ON" : "OFF"}
                  </span>
                </p>
                <Switch
                  checked={pump.value === "1"}
                  onChange={handleStatusChangeAndSwitchPump(pump.subtopic)}
                  color="primary"
                  inputProps={{ "aria-label": "toggle pump status" }}
                />
              </div>
              <div className="flex items-center">
              <p className="mr-4">
                Mode: <span className="font-medium">{pump.mode === "1" ? "Auto" : "Manual"}</span>
              </p>
                <Switch
                  checked={pump.mode === "1"}
                  onChange={handleModeChangeAndSwitchPump(pump.subtopic)}
                  color="primary"
                  inputProps={{ "aria-label": "toggle pump mode" }}
                />
              </div>
            </div>
          </div>
        </div>
        
        ))}
    </div>
  )}

  {auto === true && <div>Pump in Auto</div>}
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
                      <h4 className="text-lg font-normal mb-2">{valve.device_imei}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{valve.subtopic}</span>
                        </p>
                        <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            valve.value === "1"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {valve.value ==="1" ? "ON" : "OFF"}
                          {/* {valve.value} */}
                        </span>
                      </p>
                      <Switch
                        checked={valve.value === "1"}
                        onChange={handleStatusChangeAndSwitchValve(valve.subtopic)}
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
 
        {auto === true && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
    {pumps &&
      pumps.map((pump) => (
        <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-lg font-normal mb-2">{pump.device_imei}</h4>
        <p className="mr-4">
            Subtopic:{" "}
            <span className="font-medium">{pump.subtopic}</span>
          </p>
        <div className="flex items-center">
          
          <div className="flex items-center">
            
            <div className="flex items-center">
              <p className="mr-4">
                Status:{" "}
                <span
                  className={
                    pump.value === "1"
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {pump.value === "1" ? "ON" : "OFF"}
                </span>
              </p>
              <Switch
                checked={pump.value === "1"}
                onChange={handleStatusChangeAndSwitchPump(pump.subtopic)}
                color="primary"
                inputProps={{ "aria-label": "toggle pump status" }}
                disabled={true}
              />
            </div>
            <div className="flex items-center">
            <p className="mr-4">
              Mode: <span className="font-medium">{pump.mode === "1" ? "Auto" : "Manual"}</span>
            </p>
              <Switch
                checked={pump.mode === "1"}
                onChange={handleModeChangeAndSwitchPump(pump.subtopic)}
                color="primary"
                inputProps={{ "aria-label": "toggle pump mode" }}
                
              />
            </div>
          </div>
        </div>
      </div>
      
      ))}
  </div>
  )}

  {auto === false && <div>Pump in Manual</div>}

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
                      <h4 className="text-lg font-normal mb-2">{valve.device_imei}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          ID: <span className="font-medium">{valve.id}</span>
                        </p>
                        <div className="flex items-center">
                        <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            valve.value === "1"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {valve.value ==="1" ? "ON" : "OFF"}
                          {/* {valve.value} */}
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
