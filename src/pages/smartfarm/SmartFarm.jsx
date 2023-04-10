import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataState } from "../../actions/device/deviceAction";
import { useParams } from "react-router-dom";

const SmartFarm = () => {
  const params = useParams();

  const imei = params.id;

  const [isLoaded, setIsLoaded] = useState(false);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [auto, setAuto] = useState(false);

  const [vauto, setVauto] = useState(false);

  const [pumpMode, setPumpMode] = useState("0");

  const [valveMode, setValveMode] = useState("0");

  const [activeTab, setActiveTab] = useState(0);

  const [pumps, setPumps] = useState([
    // { id: "p_s", name: "Pump 1", mode: "manual", status: "ON", sensor: "20C" },
  ]);

  const [sensors, setSensors] = useState([])

  const [pumpsAuto, setPumpsAuto] = useState([]);

  console.log("PUMPS ARE!!!!!", pumpsAuto);

  const [valves, setValves] = useState([
  
  ]);

  const [valvesAuto, setValvesAuto] = useState([
 
  ]);

  const [valvesArr, setValvesArr] = useState([]);

  const [autoValves, setAutoValves] = useState([]);
  const [manualValves, setManualValves] = useState([]);

  const getDataState = () => {
    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {

          const valveObjects = res.data.filter(obj => /^v\d+/.test(obj.subtopic));

          const valveList = valveObjects.reduce((result, obj) => {
            const valveName = obj.subtopic.match(/^v\d+/)[0];
            const subtopicType = obj.subtopic.substr(valveName.length + 1);
            let valveObject = result.find(v => v.valveName === valveName);
            if (!valveObject) {
              valveObject = { valveName, mode: null, status: null };
              result.push(valveObject);
            }
            if (subtopicType === "m") {
              valveObject.mode = obj.value;
            } else if (subtopicType === "s") {
              valveObject.status = obj.value;
            }
            return result;
          }, []);
          
          valveList.forEach(valve => {
            valve.mode = valve.mode || "0";
            valve.status = valve.status || "0";
          });
          

          console.log("THE VALVES LIST IS!!!!!!", valveList);
          
          const manualValves = valveList.filter(valve => valve.mode === "0");
          const autoValves = valveList.filter(valve => valve.mode === "1");

          setAutoValves(autoValves)
          setManualValves(manualValves)
          
          console.log("MANUAL ONES ARE!!!",manualValves);
          console.log(autoValves);
          
        

          const valvesManual = res.data.filter((obj) =>
            [
              "v1_s",
              "v2_s",
              "v3_s",
              "v4_s",
              "v5_s",
              "v6_s",
              "v7_s",
              "v8_s",
              "v9_s",
              "v10_s",
            ].includes(obj.subtopic)
          );
          const valvesAuto = res.data.filter((obj) =>
            [
              "v1_m",
              "v2_m",
              "v3_m",
              "v4_m",
              "v5_m",
              "v6_m",
              "v7_m",
              "v8_m",
              "v9_m",
              "v10_m",
            ].includes(obj.subtopic)
          );
          const pumps = res.data.filter((obj) =>
            ["p_s"].includes(obj.subtopic)
          );
          const pumpsAuto = res.data.filter((obj) =>
            ["p_m"].includes(obj.subtopic)
          );

          const sensors = res.data.filter((obj) =>
            ["m_s_1","m_s_2","m_s_3","m_s_4","m_s_5","m_s_6","m_s_7","m_s_8","m_s_9","m_s_10",].includes(obj.subtopic)
          );

          // console.log("PUMPS MODE!!!!", pumps)
          setValves(valvesManual);
          setValvesAuto(valvesAuto);
          setPumps(pumps);
          setSensors(sensors);
          setPumpsAuto(pumpsAuto);
          if (pumpsAuto && pumpsAuto[0] && pumpsAuto[0].value === "1") {
            console.log("ITS ON AUTO!!!!!", pumpsAuto[0].value);
            setPumpMode("1");
            pumps[0]["mode"] = "1";
            setAuto(true);
          } else {
            console.log("ITS ON MANUAL!!!!!");
            setAuto(false);
            pumps[0]["mode"] = "0";
          }
          for (let i = 0; i < valvesAuto.length; i++) {
            if (valvesAuto[i] && valvesAuto[i].value === "1") {
              console.log("ITS ON AUTO!!!!!", valvesAuto[i].value);
              setValveMode("1");
              valves["mode"] = "1";
              setVauto(true);
            } else {
              console.log("ITS ON MANUAL!!!!!");
              setVauto(false);
              valves["mode"] = "0";
            }
          }
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataState();
    setIsLoaded(true);
  }, []);

  console.log("auto is!!!!!", valves);

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
    const newStatus = isChecked ? "1" : "0";
    const valve = manualValves.find((valve) => valve.valveName === subtopic);

    console.log("THIS IS VALVE!!!!", valve)

    if (valve && valve.status !== newStatus) {
      setManualValves(
        manualValves.map((b) =>
          b.valveName === subtopic ? { ...b, status: newStatus } : b
        )
      );

      const cmdBody = {
        imei: imei,
        command: subtopic+`${`_s`}`,
        value: newStatus.toString(),
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

const handleStatusChangeAndSwitchAutoValve = (subtopic) => (event) => {
  const isChecked = event.target.checked;
  const newStatus = isChecked ? "1" : "0";
  const valve = autoValves.find((valve) => valve.valveName === subtopic);

  console.log("THIS IS VALVE!!!!", valve)

  if (valve && valve.status !== newStatus) {
    setAutoValves(
      autoValves.map((b) =>
        b.valveName === subtopic ? { ...b, status: newStatus } : b
      )
    );

    const cmdBody = {
      imei: imei,
      command: subtopic+`${`_s`}`,
      value: newStatus.toString(),
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
        pumps.map((b) =>
          b.subtopic === subtopic ? { ...b, value: newValue } : b
        )
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
      setTimeout(() => {
        window.location.reload(); // reload the page after a 2-second delay
      }, 2000);
    }
  };

  const handleModeChangeAndSwitchValve = (valve) => (event) => {
    const newMode = event.target.checked ? 1 : 0;
  
    if (valve.mode !== newMode) {
      setValvesArr(
        valvesArr.map((b) =>
          b.valve === valve.valve ? { ...b, mode: newMode } : b
        )
      );
  
      const cmdBody = {
        imei: imei,
        command: "v1_m",
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
      setTimeout(() => {
        // window.location.reload(); // reload the page after a 2-second delay
      }, 2000);
    }
  };
  


  const handleStatusChangeAndSwitchvalveAuto = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const pump = pumpsAuto.find((pump) => pump.subtopic === subtopic);

    if (pump.value !== newValue) {
      setPumpsAuto(
        pumpsAuto.map((b) =>
          b.subtopic === subtopic ? { ...b, value: newValue } : b
        )
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
                        <div
                          key={pump.id}
                          className="bg-gray-100 p-4 rounded-lg"
                        >
                          <h4 className="text-lg font-normal mb-2">
                            {pump.device_imei}
                          </h4>
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
                                  onChange={handleStatusChangeAndSwitchPump(
                                    pump.subtopic
                                  )}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "toggle pump status",
                                  }}
                                />
                              </div>
                              <div className="flex items-center">
                                <p className="mr-4">
                                  Mode:{" "}
                                  <span className="font-medium">
                                    {pump.mode === "1" ? "Auto" : "Manual"}
                                  </span>
                                </p>
                                <Switch
                                  checked={pump.mode === "1"}
                                  onChange={handleModeChangeAndSwitchPump(
                                    pump.subtopic
                                  )}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "toggle pump mode",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {auto === true && (
                  <div className="text-red-600 p-4">PUMP IN AUTO</div>
                )}
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="valves-content"
                  id="valves-header"
                >
                  <span className="text-lg font-medium"> VALVES</span>
                </AccordionSummary>
                {/* {vauto === false && ( */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {manualValves && manualValves.map((valve) => (
                    <div key={valve.valveName} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">
                        {valve.device_imei}
                      </h4>
                      <p className="mr-4">
                        Subtopic:{" "}
                        <span className="font-medium">{valve.valveName}</span>
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "1"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-medium"
                              }
                            >
                              {valve.status === "1" ? "ON" : "OFF"}
              
                            </span>
                          </p>
                          <Switch
                            checked={valve.status === "1"}
                            onChange={handleStatusChangeAndSwitchValve(
                              valve.valveName
                            )}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve status" }}
                          />
                        </div>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Mode:{" "}
                            <span className="font-medium">
                              {valve.mode === 1 ? "Auto" : "Manual"}
                            </span>
                          </p>
                          <Switch
                            key={valve.valve}
                            checked={valve.mode === 1}
                            onChange={handleModeChangeAndSwitchValve(
                              valve.valve
                            )}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve mode" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* )} */}

                {/* {vauto === true && (
                  <div className="text-red-600 p-4">VALVE IN AUTO</div>
                )} */}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="valves-content"
                  id="valves-header"
                >
                  <span className="text-lg font-medium"> SENSORS</span>
                </AccordionSummary>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {sensors.map((valve) => (
                    <div key={valve.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">
                        {valve.device_imei}
                      </h4>
                      <p className="mr-4">
                        Subtopic:{" "}
                        <span className="font-medium">{valve.subtopic}</span>
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <p className="mr-4">
                            Readings:{" "}
                            <span
                              className="text-green-500 font-medium"
                            >
                              {valve.value}
                              {/* {valve.value} */}
                            </span>
                          </p>
                   
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
                        <div
                          key={pump.id}
                          className="bg-gray-100 p-4 rounded-lg"
                        >
                          <h4 className="text-lg font-normal mb-2">
                            {pump.device_imei}
                          </h4>
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
                                  onChange={handleStatusChangeAndSwitchPump(
                                    pump.subtopic
                                  )}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "toggle pump status",
                                  }}
                                  disabled={true}
                                />
                              </div>
                              <div className="flex items-center">
                                <p className="mr-4">
                                  Mode:{" "}
                                  <span className="font-medium">
                                    {pump.mode === "1" ? "Auto" : "Manual"}
                                  </span>
                                </p>
                                <Switch
                                  checked={pump.mode === "1"}
                                  onChange={handleModeChangeAndSwitchPump(
                                    pump.subtopic
                                  )}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "toggle pump mode",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {auto === false && (
                  <div className="text-red-600 p-4">PUMP IN MANUAL</div>
                )}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="valves-content"
                  id="valves-header"
                >
                  <span className="text-lg font-medium"> VALVES</span>
                </AccordionSummary>
                {/* {vauto === true && ( */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {autoValves && autoValves.map((valve) => (
                    <div key={valve.valveName} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">
                        {valve.valveName}
                      </h4>
                      <p className="mr-4">
                        Subtopic:{" "}
                        <span className="font-medium">{valve.valveName}</span>
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "1"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-medium"
                              }
                            >
                              {valve.status === "1" ? "ON" : "OFF"}
              
                            </span>
                          </p>
                          <Switch
                            checked={valve.status === "1"}
                            onChange={handleStatusChangeAndSwitchAutoValve(
                              valve.valveName
                            )}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve status" }}
                          />
                        </div>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Mode:{" "}
                            <span className="font-medium">
                              {valve.mode === 1 ? "Auto" : "Manual"}
                            </span>
                          </p>
                          <Switch
                            key={valve.valve}
                            checked={valve.mode === 1}
                            onChange={handleModeChangeAndSwitchValve(
                              valve.valve
                            )}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve mode" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* )} */}

              
              </Accordion>
            </>
          )}
        </div>
      </Sidebar>
    </>
  );
};

export default SmartFarm;





// const data = [
//     {
//         "id": 306593,
//         "subtopic": "v1_m",
//         "value": "0",
       
//     },
//     {
//         "id": 306591,
//         "subtopic": "v1_s",
//         "value": "0",
     
//     },
//     {
//         "id": 306555,
//         "subtopic": "v2_m",
//         "value": "0",
     
//     },
//     {
//         "id": 306573,
//         "subtopic": "v2_s",
//         "value": "1",
     
//     },
//     {
//         "id": 306594,
//         "subtopic": "v5_s",
//         "value": "1",
      
//     },
//     {
//         "id": 306566,
//         "subtopic": "v7_s",
//         "value": "0",
     
//     }
// ];

// const data = [
//   {
//     "valve": "v1",
//     "mode": 0,
//     "status": 0
//   },
//   {
//     "valve": "v2",
//     "mode": 0,
//     "status": 1
//   },
//   {
//     "valve": "v5",
//     "mode": 0,
//     "status": 1
//   },
//   {
//     "valve": "v7",
//     "mode": 0,
//     "status": 0
//   },
// ]