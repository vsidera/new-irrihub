import React, { useState, useEffect } from "react";
import Table from "../../components/table/table";
import { Tab, Tabs, Accordion, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../../components/sidebar/sidebar";
import {
  deviceDataState,
  deviceDataLogs,
  userDevices
} from "../../actions/device/deviceAction";
import { useParams } from "react-router-dom";
import AddGroupModal from "../../components/modals/add_group";
import "./profile.css";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


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
            // fontFamily: 'Ubuntu',
            color: "black",
            justifyContent: "center",
            // fontWeight: 'bold',
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

const Profile = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

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

  const [groupCreateModal, setGroupCreateModal] = useState(false);


  const [isLoaded, setIsLoaded] = useState(false);

  const firstname = JSON.parse(localStorage.getItem("firstname"));
  const lastname = JSON.parse(localStorage.getItem("lastname"));
  const type = JSON.parse(localStorage.getItem("type"));
  const mobile_no = JSON.parse(localStorage.getItem("mobile_no"));
  const id = JSON.parse(localStorage.getItem("id"));

  const imei = params.id;

  const [dataLogs, setDataLogs] = useState([]);

  const [dataState, setDataState] = useState([]);

  const [clientDevices, setUserDevices] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const closeGroupCreateModal = (e) => {
    e.preventDefault();
    setGroupCreateModal(false)
  }

  const userId = JSON.parse(localStorage.getItem("id"));

  const getUserDevices = () => {
    userDevices({userId})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setUserDevices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDevices();
  }, []);

  const extractedData = {};

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
                setDevice_type(extractedData.device_type)
                break;
              case "f_w":
                extractedData.firmwareVersion = obj.value;
                setFw_version(extractedData.firmwareVersion)
                break;
              case "g_s_q":
                extractedData.gpsSignalQuality = obj.value;
                setSignal_quality(extractedData.signal_quality)
                break;
              case "h_b":
                extractedData.heartbeat = obj.value;
                setHeartbeat(extractedData.heartbeat)
              case "hum":
                extractedData.humidity = obj.value;
                setHumidity(extractedData.humidity)
                break;
              case "l_t_s_b":
                extractedData.ltsb = obj.value;
                setLtsb(extractedData.ltsb)
                break;
              case "temp":
                extractedData.temperature = obj.value;
                setTemp(extractedData.temperature)
                break;
              case "w_t_l":
                extractedData.water_level = obj.value;
                setWaterLevel(extractedData.water_level)
              case "s_p_v":
                extractedData.solar_voltage = obj.value;
                setSolar_voltage(extractedData.solar_voltage)
                break;
              case "rssi":
                extractedData.rssi = obj.value;
                setRssi(extractedData.rssi)
                break;
              case "s_b_v":
                extractedData.battery_voltage = obj.value;
                setBat_voltage(extractedData.battery_voltage)
                break;
              default:
                break;
            }
          });

          setIsLoaded(true)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tankDepth, setTankDepth] = useState('');

  const handleTankDepthChange = (event) => {
    setTankDepth(event.target.value);
  };

  const handleSetPumpTrigger = () => {

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

  const solar_perc = solar_voltage / 100

  const bat_perc = bat_voltage / 50

  const hum_perc = humidity / 100

  const temp_perc = temp / 100

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
    getDataState();
    getDataLogs();
    setIsLoaded(true);
  }, [activeTab]);

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
      name: "imei_code",
      label: "IMEI",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status_description",
      label: "DESCRIPTION",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "device_type_id",
      label: "TYPE",
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

        (new Date(value).toLocaleString('en-US', { timeZone: 'UTC' }, { hour: 'numeric', hour12: true }))
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

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <AddGroupModal groupCreateModal={groupCreateModal} closeGroupCreateModal={closeGroupCreateModal}/>

      <Sidebar>
        <h1 className="text-2xl text-black mb-6">Profile</h1>
        <h4 className="text-md text-blue-900 font-serif">
          {" "}
          Details about the Device and Owner
        </h4>
        <div className="mt-4">
          <div className="container mx-auto mt-4">
            {/* <div className="flex flex-wrap -mx-4"> */}
            <div className="grid gap-2">
              <div className="w-full  px-4 mb-4 lg:col-span-1 sm:col-span-2">
                <div className="rounded-lg shadow-lg p-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h2 className=" font-normal mb-2 ml-2">PROFILE DETAILS</h2>
                    <div className="flex items-center mb-4">
                      <div className="w-1/2 pl-2 pr-1 border-r-2 border-red-500">
                        <p className="font-normal mb-2">
                          NAME:{" "}
                          <span className="text-gray-700 ml-2">
                            {firstname}
                            {` `}
                            {lastname}
                          </span>
                        </p>
                        <p className="font-normal mb-2">
                          PHONE:{" "}
                          <span className="text-gray-700 ml-2">{mobile_no}</span>
                        </p>

                      </div>
                      <div className="w-1/2 pl-4">
                        <p className="font-normal mb-2">
                          IMEI: <span className="text-gray-700 ml-4">{imei}</span>
                        </p>

                        <p className="font-normal mb-2">
                          DEVICE_TYPE:{" "}
                          <span className="text-gray-700 ml-4">{device_type}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          
            <div className="m-3 mt-8">

            <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="log-tables"
                  id="log-tables"
                >
                  <span className="text-md font-medium"> VIEW GROUPS & DEVICES</span>
                </AccordionSummary>
               

            <div className="w-full px-4">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="My Devices" />
                  <Tab label="My Groups" />
                </Tabs>
                {activeTab === 0 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={clientDevices}
                      />
                    </ThemeProvider>
                  </div>
                )}
                {activeTab === 1 && (
                  <>
                   <div className="flex justify-end">
                   <button
                     type="button"
                     className="text-white w-40 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
                     onClick={() =>setGroupCreateModal(true)}
                   >
                     <PersonAddAlt1Icon />
                     <p className="ml-4">Add Group</p>
                   </button>
                 </div> 
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={dataState}
                      />
                    </ThemeProvider>
                  </div>
                  </>
                )}
              </div>
            </div>
            </Accordion>
          </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Profile;
