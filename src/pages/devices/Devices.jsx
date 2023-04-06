import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import RegisterUserModal from "../../components/modals/register_user";
import CreateDeviceModal from "../../components/modals/add_device";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QueueIcon from '@mui/icons-material/Queue';
import { deviceList } from "../../actions/device/deviceAction";
import AttachCustomerModal from "../../components/modals/attach_customer";

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

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceModal, setDeviceModal] = useState(false);

  const [selectedImei, SetSelectedImei] = useState(null)

  const imei = 863576044816911

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const [attachCustomerModal, setAttachCustomerModal] = useState(false);

  const closeDeviceModal = (e) => {
    e.preventDefault();
    setDeviceModal(false)
  }

  const closeAttachUserModal = (e) => {
    e.preventDefault();
    setAttachCustomerModal(false)
  }

  const getDevices = () => {

    deviceList({limit,page})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setDevices(res.data);
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick2 = (imei) => {
    SetSelectedImei(imei)
    setAttachCustomerModal(true)
  }

  console.log("THE SELECTED IMEI IS!!!!", selectedImei)

  useEffect(() => {
    getDevices();
    setIsLoaded(true)

  }, [page,limit]);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
       filter: true,
       sort: false,
      }
     },
    {
     name: "imei",
     label: "IMEI",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "createdat",
     label: "CREATED AT",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "updatedat",
     label: "UPDATED AT",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "",
      label: "Attach User",
      options: {
       filter: true,
       sort: false,
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        return (
          <button onClick={() => handleClick2(dataIndex.rowData[1])}>
          <PersonAddIcon />
          </button>
        );
      }
      }
     },
  
   ];

  const options = {
    filter: false,
    filterType: 'textField',
    responsive: 'standard',
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: 'Ubuntu',
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: 'auto',
    enableNestedDataAccess: '.',
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ',',
      filename: 'Customers Summary.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`.replace(/[^\x00-\x7F]/g, "").toString().trim();
      return val;
    },
   
    textLabels: {
      body: {
        noMatch: isLoaded ? "Sorry, no matching records exist in Irrihub"
          : <div >
            ......
          </div>,
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
          color: 'primary',
          variant: 'outlined',
          className: 'testClass123',
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
    }
  }

  return (
    <AdminSidebar>
    <AttachCustomerModal attachCustomerModal={attachCustomerModal} closeAttachCustomerModal={closeAttachUserModal} imei={imei}/>
    <CreateDeviceModal deviceModal={deviceModal} closeDeviceModal={closeDeviceModal}/>
    <h1 className="text-2xl text-black mb-6">Devices</h1>
    <h4 className="text-md text-gray-800 font-serif">A list of all the devices </h4>
    <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-36 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setDeviceModal(true)}
        >
          <QueueIcon />
          <p className="ml-4">Add Device</p>
        </button>
      </div>
    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={devices} />
      </ThemeProvider>
    </div>
    </AdminSidebar>
  );
};

export default Devices;
