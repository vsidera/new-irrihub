import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataState, deviceDataLogs } from "../../actions/device/deviceAction";
import {useParams} from 'react-router-dom';
import Table from "../../components/table/table";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const SmartFarm = () => {


  const params = useParams();

  const imei = params.id
  const [activeTab, setActiveTab] = useState(0);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const [bulbs, setBulbs] = useState([]);

  const [dataLogs, setDataLogs] = useState([]);

  const [dataState, setDataState] = useState([]);

  const handleStatusChangeAndSwitch = (subtopic_code) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const bulb = bulbs.find((bulb) => bulb.subtopic_code === subtopic_code);
  
    if (bulb.value !== newValue) {
      setBulbs(
        bulbs.map((b) => (b.subtopic_code === subtopic_code ? { ...b, value: newValue } : b))
      );

      const cmdBody = {
        device_id: parseInt(imei),
        subtopic_code: subtopic_code,
        value: newValue.toString(),
    }

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
          const filteredData = res.data.filter(obj => ['b1', 'b2', 'b3', 'b4'].includes(obj.subtopic_code));
          setBulbs(filteredData);
  
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataState();
    getDataLogs();
    setIsLoaded(true)

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
      name: "subtopic_code",
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
                  <h4 className="text-lg font-normal mb-2">{bulb.device_imei}</h4>
                  <div className="flex items-center">
                    <p className="mr-4">
                      SUB TOPIC: <span className="font-medium">{bulb.subtopic_code}</span>
                    </p>
                    <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            bulb.value === "1"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {bulb.value ==="1" ? "ON" : "OFF"}
                          {/* {bulb.value} */}
                        </span>
                      </p>
                      <Switch
                        checked={bulb.value === "1"}
                        onChange={handleStatusChangeAndSwitch(bulb.subtopic_code)}
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
      <div className=" mt-8">

            <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="log-tables"
                  id="log-tables"
                >
                  <span className="text-md font-medium"> VIEW DEVICE DATA TABLES</span>
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
