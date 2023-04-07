import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from "../../components/table/table"
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AddCustomerModal from "../../components/modals/add_customer";
import EditUserModal from "../../components/modals/edit_user";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import { customerList } from "../../actions/customer/customerAction";

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

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [userId, setUserId] = useState(null)

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)

  const getCustomers = () => {

    customerList({limit,page})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setCustomers(res.data);
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCustomers();
    setIsLoaded(true)

  }, [page,limit, editModal]);

  const closeCreateModal = (e) => {
    e.preventDefault();
    setCreateModal(false)
  }

  const closeEditModal = (e) => {
    e.preventDefault();
    setEditModal(false)
  }

  const handleClick2 = (id) => {
    setUserId(id)
    setEditModal(true)
  }

  const columns = [
    {
     name: "firstname",
     label: "FIRST NAME",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "lastname",
      label: "LAST NAME",
      options: {
       filter: true,
       sort: false,
      }
     },
    {
     name: "type",
     label: "TYPE",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "mobile_no",
     label: "PHONE",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "createdat",
     label: "CREATED",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
      name: "",
      label: "Edit",
      options: {
       filter: true,
       sort: false,
       customBodyRender: (tableMeta, dataIndex, rowIndex) => {
        
        return (
          <button onClick={() => handleClick2(dataIndex.rowData[0])}>
          <EditIcon />
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
    <AddCustomerModal createModal={createModal} closeCreateModal={closeCreateModal} />
    <EditUserModal editModal={editModal} closeEditModal={closeEditModal} userId={userId}/>
    <h1 className="text-2xl text-black mb-6">Customers</h1>
    <h4 className="text-md text-gray-800 font-serif">A list of all the customers </h4>
    {/* <div className="flex justify-end">
        <button
          type="button"
          className="text-white w-40 bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 mt-4 flex items-center mr-2"
          onClick={() =>setCreateModal(true)}
        >
          <PersonAddAlt1Icon />
          <p className="ml-4">Add Customer</p>
        </button>
      </div> */}
    <div className="mt-4">
      <ThemeProvider theme={getMuiTheme()}>

        <Table columns={columns} options={options} data={customers} />
      </ThemeProvider>
    </div>
    </AdminSidebar>
  );
};

export default Customers;
