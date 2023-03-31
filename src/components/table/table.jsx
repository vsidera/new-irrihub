import React from 'react'
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {DownloadIcon} from '../TableComponents/Export';


const   Datatable = ({columns, options, data}) => {

  // const components = {
  //   icons: {
  //     DownloadIcon,
  //   }
  // };

  return (

        <div>
        <MUIDataTable 
          columns={columns}
          data={data}
          options={options}
          // components={components}
        />

        </div>
  )
      
}

export default Datatable
