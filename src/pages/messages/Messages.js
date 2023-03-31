import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import { messagesAction } from "../../actions/messages/messagesAction";

import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import SendSmsModal from "../../components/modals/send_sms";
import ScheduleModal from "../../components/modals/schedule_sms";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {useParams} from 'react-router-dom';

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

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [smsModal, setSmsModal] = useState(false)

  const [scheduleModal, setScheduleModal] = useState(false)
  
  const params = useParams();

  const app_id = params.id

  const getMessages = () => {

    messagesAction(app_id)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED")
        } else {
          setMessages(res.data)
          setIsLoaded(true)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const closeSendModal = (e) => {
    e.preventDefault();
    setSmsModal(false)
    setScheduleModal(false)
  }

  useEffect(() => {

    getMessages();
  }, []);

  const columns = [
    {
     name: "id",
     label: "NAME",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "source",
     label: "COMPANY",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "direction",
     label: "CITY",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "status_desc",
     label: "STATE",
     options: {
      filter: true,
      sort: false,
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
    serverSide: true,
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
        downloadCsv: "Download Messages Excel List",
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
      <Sidebar>
      <h1 className="text-2xl text-black mb-6">Messages</h1>
      <h4 className="text-md text-gray-800 font-serif">A list of messages sent to the client</h4>
      <div className="flex justify-end">
        
      <button
          type="button"
          className="text-white w-36 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setSmsModal(true)}
        >
          <SendToMobileIcon />
          <p className="ml-4">Send</p>
        </button>
        <button
          type="button"
          className="text-white w-36 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setScheduleModal(true)}
        >
          <ScheduleSendIcon />
          <p className="ml-4">Schedule</p>
        </button>
      </div>
      <SendSmsModal smsModal={smsModal} closeSendModal={closeSendModal}/>
      <ScheduleModal scheduleModal={scheduleModal} closeSendModal={closeSendModal}/>
      


      <div className="mt-4">
        <ThemeProvider theme={getMuiTheme()}>

          <Table columns={columns} options={options} data={messages} />
        </ThemeProvider>
      </div>
      </Sidebar>
    )
  }
  
  export default Messages