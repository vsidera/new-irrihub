import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import {
  deviceDataState,
  deviceDataLogs,
} from "../../actions/device/deviceAction";
import { useParams } from "react-router-dom";
import { Card } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Icon } from "@material-ui/core";
import { Pool, Opacity, Waves } from "@material-ui/icons";
import GaugeChart from "react-gauge-chart";
import ValveSlider from "../../components/utils/slider";
import Thermometer from "../../components/thermometer/thermometer";
import Visual from "../../components/thermometer/visual";
import Battery from "../../components/battery/battery";
import DiscreteSliderMarks from "../../components/thermometer/thermometer";
import Table from "../../components/table/table";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Ubuntu",
            fontWeight: "inherit",
          },
          footer: {
            border: 0,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            color: "black",
            justifyContent: "center",
          },
        },
      },

      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: "#5f6062",
            color: "wh",
          },
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: "relative",
            height: "auto",
            borderRadius: "18px",
            border: "1px solid #f2f2f2",
            boxShadow: "0 0 6px 4px #efefef",
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: "0 ",
          },
        },
      },
    },
  });

const SmartFarm = () => {
  const [heartbeat, setHeartbeat] = useState("...");
  const [fw_version, setFw_version] = useState("...");
  const [bat_voltage, setBat_voltage] = useState("...");
  const [solar_voltage, setSolar_voltage] = useState("...");
  const [device_type, setDevice_type] = useState("...");
  const [signal_quality, setSignal_quality] = useState("...");
  const [temp, setTemp] = useState("...");
  const [waterLevel, setWaterLevel] = useState("...");
  const [ltsb, setLtsb] = useState("...");
  const [humidity, setHumidity] = useState("...");
  const [rssi, setRssi] = useState("...");

  const [dataLogs, setDataLogs] = useState([]);

  const [dataState, setDataState] = useState([]);

  const extractedData = {};

  const [tankDepth, setTankDepth] = useState("");

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

  const solar_perc = solar_voltage / 100;

  const bat_perc = bat_voltage / 50;

  const hum_perc = humidity / 100;

  const temp_perc = temp / 100;

  const handleTankDepthChange = (event) => {
    setTankDepth(event.target.value);
  };

  const handleSetPumpTriggerP = () => {
    const cmdBody = {
      imei: imei,
      command: "t_d",
      value: tankDepth.toString(),
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



  const getDataState = () => {
    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setDataState(res.data);
          const deviceData = res.data;

          deviceData.forEach((obj) => {
            switch (obj.subtopic) {
              case "d_t":
                extractedData.device_type = obj.value;
                setDevice_type(extractedData.device_type);
                break;
              case "f_w":
                extractedData.firmwareVersion = obj.value;
                setFw_version(extractedData.firmwareVersion);
                break;
              case "g_s_q":
                extractedData.gpsSignalQuality = obj.value;
                setSignal_quality(extractedData.signal_quality);
                break;
              case "h_b":
                extractedData.heartbeat = obj.value;
                setHeartbeat(extractedData.heartbeat);
              case "hum":
                extractedData.humidity = obj.value;
                setHumidity(extractedData.humidity);
                break;
              case "l_t_s_b":
                extractedData.ltsb = obj.value;
                setLtsb(extractedData.ltsb);
                break;
              case "temp":
                extractedData.temperature = obj.value;
                setTemp(extractedData.temperature);
                break;
              case "w_t_l":
                extractedData.water_level = obj.value;
                setWaterLevel(extractedData.water_level);
              case "s_p_v":
                extractedData.solar_voltage = obj.value;
                setSolar_voltage(extractedData.solar_voltage);
                break;
              case "rssi":
                extractedData.rssi = obj.value;
                setRssi(extractedData.rssi);
                break;
              case "s_b_v":
                extractedData.battery_voltage = obj.value;
                setBat_voltage(extractedData.battery_voltage);
                break;
              default:
                break;
            }
          });

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

  const [tankValue, setTankValue] = useState("");

  const handleTankValueChange = (event) => {
    setTankValue(event.target.value);
  };

  const handleSetPumpTrigger = () => {
    const cmdBody = {
      imei: imei,
      command: "t_l",
      value: tankValue.toString(),
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

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "subtopic",
      label: "SUB TOPIC",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "value",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "createdat",
      label: "CREATED",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          new Date(value).toLocaleString(
            "en-US",
            { timeZone: "UTC" },
            { hour: "numeric", hour12: true }
          ),
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "textField",
    responsive: "standard",
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: "Ubuntu",
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: "auto",
    enableNestedDataAccess: ".",
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ",",
      filename: "Customers Summary.csv",
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`
        .replace(/[^\x00-\x7F]/g, "")
        .toString()
        .trim();
      return val;
    },

    textLabels: {
      body: {
        noMatch: isLoaded ? (
          "Sorry, no matching records exist in Irrihub"
        ) : (
          <div>......</div>
        ),
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search A/C Number,Name or Payplans",
        downloadCsv: "Download User Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: "primary",
          variant: "outlined",
          className: "testClass123",
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    },
  };

  useEffect(() => {
    getDataState();
    getDataLogs();
    setIsLoaded(true);
  }, [activeTab]);

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
        <div className="mt-16">
          <div className="w-full sm:col-span-2 lg:col-span-1 px-4 mb-16">
            <div className="rounded-lg shadow-lg p-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className=" font-normal mb-2 ml-4">DEVICE DETAILS</h2>
                <div className="flex items-center mb-4">
                  <div className="w-1/3 pl-4 pr-2 border-r-2 border-red-500">
                    <p className="font-normal mb-2">
                      HEARTBEAT:{" "}
                      <span className="text-gray-700 ml-2">{heartbeat}</span>
                    </p>
                    <p className="font-normal mb-2">
                      SIGNAL QUALITY:{" "}
                      <span className="text-gray-700 ml-2">
                        {signal_quality}
                      </span>
                    </p>
                  </div>
                  <div className="w-1/3 pl-4 pr-2 border-r-2 border-red-500">
                    <p className="font-normal mb-2">
                      Humidity:{" "}
                      <span className="text-gray-700 ml-4">{humidity} RH</span>
                    </p>
                    <p className="font-normal mb-2">
                      Rssi: <span className="text-gray-700 ml-2">{rssi}</span>
                    </p>
                  </div>
                  <div className="w-1/3 pl-2 pr-1">
                    <p className="font-normal mb-2">
                      Firmware Ver:{" "}
                      <span className="text-gray-700 ml-4">{fw_version}</span>
                    </p>
                    <p className="font-normal mb-2">
                      Link to Sensor Board:{" "}
                      <span
                        className={`ml-2 ${
                          ltsb ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {ltsb ? "True" : "False"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mx-4">
            <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4  ">
              <div className="w-full h-full">
                <div>
                  <Card>
                    <div className="grid grid-cols-7">
                      <div className="col-span-4 flex-col">
                        <div className="flex justify-center mb-8">
                          <div className="water-tank mt-12">
                            <div
                              className="water-level"
                              style={{ height: `${80}%` }}
                            >
                              <Icon className="water-icon">
                                <Pool />
                              </Icon>
                              <Icon className="water-icon">
                                <Opacity />
                              </Icon>
                              <Icon className="water-icon">
                                <Waves />
                              </Icon>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4 mb-2">
                          <h2 className="text-lg font-medium mt-4">
                            Water Level
                          </h2>
                          <p className="text-gray-500">{80} CM</p>
                        </div>
                      </div>
                      <div className="w-1/3 flex items-center">
                        <div className="m-1">
                          <p className="m-1 whitespace-nowrap -mt-10">
                            SET TANK DEPTH
                          </p>
                          <input
                            value={tankDepth}
                            onChange={handleTankDepthChange}
                            className="w-full border rounded px-2 py-1 m-1"
                            type="number"
                            placeholder="depth of tank"
                          />
                          <button
                            onClick={handleSetPumpTriggerP}
                            className=" w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1 m-1"
                          >
                            Set
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="">
                <Card>
                  <GaugeChart
                    id="solar"
                    nrOfLevels={420}
                    arcsLength={[0.3, 0.5, 0.2]}
                    colors={["#5BE12C", "#1434A4", "#F5CD19"]}
                    textColor="#4145E8"
                    percent={solar_perc}
                    arcPadding={0.02}
                  />
                  <div className="text-center mt-4 mb-2">
                    <h2 className="text-lg font-medium">Solar Voltage</h2>
                    <p className="text-gray-500 ">{solar_voltage} V</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
              <div className="">
                <Card className="text-center">
                  <div className="d-flex justify-content-center m-8">
                    <DiscreteSliderMarks />
                  </div>

                  <div className="text-center mt-4 mb-5">
                    <h2 className="text-lg font-medium">Temperature</h2>
                    <p className="text-gray-500">{temp} °C</p>
                  </div>
                </Card>
              </div>
              <div className="">
                <Card>
                  <div className="d-flex justify-content-center align-items-center m-11">
                    <Battery percentage={60} />
                  </div>

                  <div className="text-center mt-4 mb-2">
                    <h2 className="text-lg font-medium">Battery Voltage</h2>
                    <p className="text-gray-500">{bat_voltage} V</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                    {pumps &&
                      pumps.map((pump) => (
                        <div
                          key={pump.id}
                          className="bg-gray-100 p-4 rounded-lg w-full"
                          style={{ gridColumn: "span 1" }}
                        >
                          <h4 className="text-lg font-normal mb-2">
                            {pump.device_imei}
                          </h4>
                          <p className="mr-4">
                            Name:{" "}
                            <span className="font-medium">
                              Pump {pump.subtopic}
                            </span>
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
                                  size="large"
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
                                  size="large"
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

              <Accordion defaultExpanded={true}>
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
                          Name:{" "}
                          <span className="font-medium">
                            Valve {valve.valveName}
                          </span>
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
                          <p className="mr-4">
                            Name:{" "}
                            <span className="font-medium">
                              Pump {pump.subtopic}
                            </span>
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
                          <div className="flex items-center">
                            <p>Set tank level trigger</p>
                            <input
                              value={tankValue}
                              onChange={handleTankValueChange}
                              className="w-1/4 p-1 m-3"
                              type="number"
                              placeholder="Enter tank value"
                            />
                            <button
                              onClick={handleSetPumpTrigger}
                              className="py-1 px-5 bg-blue-800 hover:bg-green-600 text-white rounded-lg"
                            >
                              Set
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {auto === false && (
                  <div className="text-red-600 p-4">PUMP IN MANUAL</div>
                )}
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="valves-content"
                  id="valves-header"
                >
                  <span className="text-lg font-medium"> VALVES</span>
                </AccordionSummary>
                {/* {vauto === true && ( */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
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
                          className="bg-gray-100 p-4 rounded-lg w-full"
                        >
                          <div className="flex items-center justify-between">
                            <p className="mr-4">
                              Name:{" "}
                              <span className="font-medium">
                                Valve {valve.valveName}
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
                                inputProps={{
                                  "aria-label": "toggle valve status",
                                }}
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
                                inputProps={{
                                  "aria-label": "toggle valve mode",
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <p>Set soil moisture trigger</p>
                            <ValveSlider
                              imei={imei}
                              subtopic={valve.valveName}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Accordion>
            </>
          )}
        </div>
        <div className="mt-8">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="log-tables"
              id="log-tables"
            >
              <span className="text-md font-medium">
                {" "}
                VIEW DEVICE DATA TABLES
              </span>
            </AccordionSummary>

            <div className="w-full px-4">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Device Data Logs" />
                  <Tab label="Device Current State" />
                </Tabs>
                {activeTab === 0 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={dataLogs}
                      />
                    </ThemeProvider>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={dataState}
                      />
                    </ThemeProvider>
                  </div>
                )}
              </div>
            </div>
          </Accordion>
        </div>
      </Sidebar>
    </>
  );
};

export default SmartFarm;
