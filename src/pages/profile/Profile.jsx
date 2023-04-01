import React, { useState } from "react";
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

  const [pumps, setPumps] = useState( [
    { id: 1, name: "Pump 1", mode: "manual", status: "on" },
    { id: 2, name: "Pump 2", mode: "auto", status: "off" },
    { id: 3, name: "Pump 3", mode: "manual", status: "off" },
  ]);

  const [valves, setValves] = useState( [
    { id: 1, name: "Valve 1", mode: "manual", status: "on" },
    { id: 2, name: "Valve 2", mode: "auto", status: "off" },
    { id: 3, name: "Valve 3", mode: "manual", status: "off" },
  ]);

  const [databulbs, setDatabulbs] = useState([
    { id: 1, name: "Bulb 1", mode: "manual", status: "on" },
    { id: 2, name: "Bulb 2", mode: "auto", status: "off" },
    { id: 3, name: "Bulb 3", mode: "manual", status: "off" },
    { id: 4, name: "Bulb 2", mode: "auto", status: "off" },
    { id: 5, name: "Bulb 3", mode: "manual", status: "off" },
  ]);

  const handleStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "on" : "off";
    if (databulbs.find((bulb) => bulb.id === id).status !== newStatus) {
      setDatabulbs(
        databulbs.map((bulb) =>
          bulb.id === id ? { ...bulb, status: newStatus } : bulb
        )
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const actions = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      id: 1,
      phone: "+1-555-555-5555",
      location: "Kakamega",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      id: 2,
      phone: "+1-555-555-5556",
      location: "Kisumu",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      id: 3,
      phone: "+1-555-555-5557",
      location: "Eldoret",
    },
    {
      name: "Samantha Lee",
      email: "samantha.lee@example.com",
      id: 4,
      phone: "+1-555-555-5558",
      location: "Wajir",
    },
    {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      id: 5,
      phone: "+1-555-555-5559",
      location: "Lamu",
    },
  ];

  const columns = [
    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "EMAIL",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "PHONE",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "location",
      label: "LOCATION",
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
      <h4 className="text-md text-gray-800 font-serif">
        {" "}
        Details about the Device and Owner
      </h4>
    <div class="border-2 border-red-500 rounded-2xl p-4 m-16">
    <div className="container mx-auto mt-12">
      <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/2 px-4 mb-8">
  <div className="bg-white rounded-lg shadow-xl p-6">
    <h2 className="text-2xl text-blue-800 font-medium mb-4">Device Details</h2>
    <div className="flex items-center mb-4">
      <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
        <p className="font-semibold mb-2">IMEI:</p>
        <p className="flex justify-between items-center mb-2">
          <span>111226</span>
          <span className="text-right ml-2"> </span>
        </p>
        <p className="font-semibold mb-2">Name:</p>
        <p className="flex justify-between items-center mb-2">
          <span>Device 1</span>
          <span className="text-right ml-2"> </span>
        </p>
      </div>
      <div className="w-1/2 pl-4">
        <p className="font-semibold mb-2">Owner:</p>
        <p className="flex justify-between items-center mb-2">
          <span>Ole Gunar</span>
          <span className="text-right ml-2"> </span>
        </p>
        <p className="font-semibold mb-2">Location:</p>
        <p className="flex justify-between items-center">
          <span>Wajir</span>
          <span className="text-right ml-2"> </span>
        </p>
      </div>
    </div>
  </div>
</div>

<div className="w-full md:w-1/2 px-4 mb-8">
  <div className="bg-white rounded-lg shadow-xl p-6">
    <h2 className="text-2xl text-blue-800 font-medium mb-4">More Details</h2>
    <div className="flex items-center mb-4">
      <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
        <p className="font-semibold mb-2">Valves:</p>
        <p className="flex justify-between items-center mb-2">
          <span>6</span>
          <span className="text-right ml-2"> </span>
        </p>
        <p className="font-semibold mb-2">Pumps:</p>
        <p className="flex justify-between items-center mb-2">
          <span>8</span>
          <span className="text-right ml-2"> </span>
        </p>
      </div>
      <div className="w-1/2 pl-4">
        <p className="font-semibold mb-2">Bulbs:</p>
        <p className="flex justify-between items-center mb-2">
          <span>12</span>
          <span className="text-right ml-2"> </span>
        </p>
        <p className="font-semibold mb-2">Location:</p>
        <p className="flex justify-between items-center">
          <span>Home</span>
          <span className="text-right ml-2"> </span>
        </p>
      </div>
    </div>
  </div>
</div>



        <div className="w-full px-4">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Action Logs</Typography>
            </AccordionSummary>
            <ThemeProvider theme={getMuiTheme()}>
              <Table columns={columns} options={options} data={actions} />
            </ThemeProvider>
          </Accordion>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl text-blue-800 font-medium mb-4">Device Controls</h2>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Bulbs" />
              <Tab label="Pumps" />
              <Tab label="Valves" />
            </Tabs>
            {activeTab === 0 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Bulb Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {databulbs.map((bulb) => (
                    <div key={bulb.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">{bulb.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-bold">{bulb.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                bulb.status === "on"
                                  ? "text-green-500 font-bold"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {bulb.status}
                            </span>
                          </p>
                          <Switch
                            checked={bulb.status === "on"}
                            onChange={handleStatusChange(bulb.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle bulb status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Pump Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pumps.map((bulb) => (
                    <div key={bulb.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">{bulb.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-bold">{bulb.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                bulb.status === "on"
                                  ? "text-green-500 font-bold"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {bulb.status}
                            </span>
                          </p>
                          <Switch
                            checked={bulb.status === "on"}
                            onChange={handleStatusChange(bulb.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle bulb status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Valve Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {valves.map((bulb) => (
                    <div key={bulb.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-bold mb-2">{bulb.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-bold">{bulb.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                bulb.status === "on"
                                  ? "text-green-500 font-bold"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {bulb.status}
                            </span>
                          </p>
                          <Switch
                            checked={bulb.status === "on"}
                            onChange={handleStatusChange(bulb.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle bulb status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
