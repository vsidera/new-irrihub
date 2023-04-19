import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataState } from "../../actions/device/deviceAction";
import { useParams } from "react-router-dom";
import ValveSlider from "../../components/utils/slider";

const SmartFarm = () => {
  const params = useParams();
  const imei = params.id;
  const [isLoaded, setIsLoaded] = useState(false);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [auto, setAuto] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [pumps, setPumps] = useState([]);
  const [sensors, setSensors] = useState([]);

  const [autoValves, setAutoValves] = useState([]);
  const [manualValves, setManualValves] = useState([]);

  const getDataState = () => {
    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          const valveObjects = res.data.filter((obj) =>
            /^v\d+/.test(obj.subtopic)
          );

          const valveList = valveObjects.reduce((result, obj) => {
            const valveName = obj.subtopic.match(/^v\d+/)[0];
            const subtopicType = obj.subtopic.substr(valveName.length + 1);
            let valveObject = result.find((v) => v.valveName === valveName);
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

          valveList.forEach((valve) => {
            valve.mode = valve.mode || "0";
            valve.status = valve.status || "0";
          });

          const manualValves = valveList.filter((valve) => valve.mode === "0");
          const autoValves = valveList.filter((valve) => valve.mode === "1");

          setAutoValves(autoValves);
          setManualValves(manualValves);

          const pumps = res.data.filter((obj) =>
            ["p_s"].includes(obj.subtopic)
          );
          const pumpsAuto = res.data.filter((obj) =>
            ["p_m"].includes(obj.subtopic)
          );

          const sensors = res.data.filter((obj) =>
            [
              "m_s_1",
              "m_s_2",
              "m_s_3",
              "m_s_4",
              "m_s_5",
              "m_s_6",
              "m_s_7",
              "m_s_8",
              "m_s_9",
              "m_s_10",
            ].includes(obj.subtopic)
          );
          setPumps(pumps);
          setSensors(sensors);

          if (pumpsAuto && pumpsAuto[0] && pumpsAuto[0].value === "1") {
            pumps[0]["mode"] = "1";
            setAuto(true);
          } else {
            setAuto(false);
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
    setIsLoaded(true);
  }, []);

  const handleStatusChangeAndSwitchManualValve = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "1" : "0";
    const valve = manualValves.find((valve) => valve.valveName === subtopic);

    if (valve && valve.status !== newStatus) {
      setManualValves(
        manualValves.map((b) =>
          b.valveName === subtopic ? { ...b, status: newStatus } : b
        )
      );

      const cmdBody = {
        imei: imei,
        command: subtopic + `${`_s`}`,
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

  const handleModeChangeAndSwitchManualValve = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newMode = isChecked ? "1" : "0";
    const valve = manualValves.find((valve) => valve.valveName === subtopic);

    if (valve && valve.mode !== newMode) {
      setManualValves(
        manualValves.map((b) =>
          b.valveName === subtopic ? { ...b, mode: newMode } : b
        )
      );

      const cmdBody = {
        imei: imei,
        command: subtopic + `${`_m`}`,
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

  const handleModeChangeAndSwitchAutoValve = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newMode = isChecked ? "1" : "0";
    const valve = autoValves.find((valve) => valve.valveName === subtopic);

    if (valve && valve.mode !== newMode) {
      setAutoValves(
        autoValves.map((b) =>
          b.valveName === subtopic ? { ...b, mode: newMode } : b
        )
      );

      const cmdBody = {
        imei: imei,
        command: subtopic + `${`_m`}`,
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

  const handleStatusChangeAndSwitchAutoValve = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "1" : "0";
    const valve = autoValves.find((valve) => valve.valveName === subtopic);

    if (valve && valve.status !== newStatus) {
      setAutoValves(
        autoValves.map((b) =>
          b.valveName === subtopic ? { ...b, status: newStatus } : b
        )
      );

      const cmdBody = {
        imei: imei,
        command: subtopic + `${`_s`}`,
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  console.log("SENSORS & VALVES!!!!!!!", sensors, autoValves);

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {manualValves &&
                    manualValves.map((valve) => (
                      <div
                        key={valve.valveName}
                        className="bg-gray-100 p-4 rounded-lg"
                      >
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
                              onChange={handleStatusChangeAndSwitchManualValve(
                                valve.valveName
                              )}
                              color="primary"
                              inputProps={{
                                "aria-label": "toggle valve status",
                              }}
                            />
                          </div>
                          <div className="flex items-center">
                            <p className="mr-4">
                              Mode:{" "}
                              <span className="font-medium">
                                {valve.mode === "1" ? "Auto" : "Manual"}
                              </span>
                            </p>
                            <Switch
                              checked={valve.mode === "1"}
                              onChange={handleModeChangeAndSwitchManualValve(
                                valve.valveName
                              )}
                              color="primary"
                              inputProps={{ "aria-label": "toggle valve mode" }}
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
                  {autoValves &&
                    autoValves.map((valve) => {
                      const valveNumber = valve.valveName.match(/\d+/)[0];
                      const sensor = sensors.find(
                        (s) => s.subtopic === `m_s_${valveNumber}`
                      );
                      const sensorValue = sensor ? sensor.value : null;
                      return (
                        <div
                          key={valve.valveName}
                          className="bg-gray-100 p-4 rounded-lg"
                        >
                         <div className="flex items-center justify-between">
                          <p className="mr-4">
                            Subtopic:{" "}
                            <span className="font-medium">
                              {valve.valveName}
                            </span>
                          </p>
                         
                          {sensorValue && (
                              <p>
                                Sensor value:{" "}
                                <span className="font-medium text-green-500">
                                  {sensorValue}
                                </span>
                              </p>
                            )}
                       </div>
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
                            disabled={true}
                          />
                        </div>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Mode:{" "}
                            <span className="font-medium">
                              {valve.mode === "1" ? "Auto" : "Manual"}
                            </span>
                          </p>
                          <Switch
                            checked={valve.mode === "1"}
                            onChange={handleModeChangeAndSwitchAutoValve(
                              valve.valveName
                            )}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve mode" }}
                          />
                        </div>
                      </div>
                          <div>
                            <ValveSlider imei={imei} subtopic={valve.valveName}/>
                     
                          </div>
                        </div>
                      );
                    })}
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
