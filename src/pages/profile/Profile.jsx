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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const actions = [
    {
      name: "John Doe",
      imei: "111111",
      id: 1,
      action: "Switched On",
      location: "Kakamega",
    },
    {
      name: "Jane Smith",
      imei: "22222222",
      id: 2,
      action: "Switched Off",
      location: "Kisumu",
    },
    {
      name: "Bob Johnson",
      imei: "33333333",
      id: 3,
      action: "Deactivated",
      location: "Eldoret",
    },
    {
      name: "Samantha Lee",
      imei: "44444444",
      id: 4,
      action: "Switched On",
      location: "Wajir",
    },
    {
      name: "Michael Chen",
      imei: "55555555",
      id: 5,
      action: "Switched Off",
      location: "Lamu",
    },
  ];

  const columns = [
    {
      name: "name",
      label: "OWNER",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "imei",
      label: "IMEI",
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
    {
      name: "action",
      label: "ACTION",
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
      <div className="mt-4">
        <div className="container mx-auto mt-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
              <div className="rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h2 className="text-lg font-normal mb-2">DEVICE DETAILS</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
                      <p className="font-normal mb-2">
                        IMEI: <span className="text-gray-700 ml-2">111226</span>
                      </p>
                      <p className="font-normal mb-2">
                        NAME: <span className="text-gray-700 ml-2">Device 1</span>
                      </p>
                    </div>
                    <div className="w-1/2 pl-4">
                      <p className="font-normal mb-2">
                        OWNER: <span className="text-gray-700 ml-4">Victor Siderra</span>
                      </p>
                      <p className="font-normal mb-2">
                        LOCATION: <span className="text-gray-700 ml-4">Wajir</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <div className="rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h2 className="text-lg font-normal mb-2">MORE DETAILS</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 pl-4 pr-2 border-r-2 border-red-500">
                      <p className="font-normal mb-2">
                        VALVES: <span className="text-gray-700 ml-2">6</span>
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
                  <Tab label="Device Action Logs" />
                  <Tab label="Device Details Logs" />
                </Tabs>
                {activeTab === 0 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={actions}
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
                        data={actions}
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