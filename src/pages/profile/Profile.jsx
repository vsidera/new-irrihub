import React, { useState, useEffect } from "react";
import Table from "../../components/table/table";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../../components/sidebar/sidebar";
import { deviceDataState, deviceDataLogs } from "../../actions/device/deviceAction";

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
  const [activeTab, setActiveTab] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  const firstname = JSON.parse(localStorage.getItem('firstname'));
  const lastname = JSON.parse(localStorage.getItem('lastname'));
  const type = JSON.parse(localStorage.getItem('type'));
  const mobile_no = JSON.parse(localStorage.getItem('mobile_no'));
  const id = JSON.parse(localStorage.getItem('id'));

   // const imei = params.id
   const imei = 863576044816911

  const [dataLogs, setDataLogs] = useState([]);

  const [dataState, setDataState] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getDataState = () => {

    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {

          setDataState(res.data);
  
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    getDataState();
    getDataLogs();
    setIsLoaded(true)

  }, []);

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
      name: "device_imei",
      label: "IMEI",
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
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Profile</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        Details about the Device and Owner
      </h4>
      <div className="mt-4">
        <div className="container mx-auto mt-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <div className="rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h2 className=" font-normal mb-2 ml-4">PROFILE DETAILS</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
                      <p className="font-normal mb-2">
                        NAME: <span className="text-gray-700 ml-2">{firstname}{` `}{lastname}</span>
                      </p>
                      <p className="font-normal mb-2">
                        PHONE: <span className="text-gray-700 ml-2">{mobile_no}</span>
                      </p>
                    </div>
                    <div className="w-1/2 pl-4">
                      <p className="font-normal mb-2">
                        TYPE: <span className="text-gray-700 ml-4">{type}</span>
                      </p>
                      <p className="font-normal mb-2">
                        ID: <span className="text-gray-700 ml-4">{id}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <div className="rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h2 className=" font-normal mb-2 ml-4">DEVICE DETAILS</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
                      <p className="font-normal mb-2">
                        IMEI: <span className="text-gray-700 ml-2">{imei}</span>
                      </p>
                      <p className="font-normal mb-2">
                        PUMPS: <span className="text-gray-700 ml-2">8</span>
                      </p>
                    </div>
                    <div className="w-1/2 pl-4">
                      <p className="font-normal mb-2">
                        BULBS: <span className="text-gray-700 ml-4">12</span>
                      </p>
                      <p className="font-normal mb-2">
                        LOCATION: <span className="text-gray-700 ml-4">Wajir</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Profile;
