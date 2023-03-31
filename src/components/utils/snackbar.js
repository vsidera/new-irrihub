import React from 'react'
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';

const SnackbarAlert = (props) => {

    const { open, type, message, handleClose, title } = props;
    let snackBarColor =""

    if (type == "success"){
        snackBarColor = "#4BB543"
    }
    else if (type== "fail"){
        snackBarColor = "#ff0033"
    }

    const msgBody = (
      <>
        <div className="row gutter-8">
          <div className="col-auto">
            <i className="icon-user" />
          </div>
          <div className="col">
            <h6>{title}</h6>
            {message}
          </div>
        </div>
      </>
    );
  
    const actionBody = (
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}>
          <i className="icon-user" />
        </IconButton>
      </>
    );
    return (
      <>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          className={type}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handleClose}
          
          action={actionBody}
        >
            <SnackbarContent style={{
                backgroundColor: snackBarColor,
                }}
                message={msgBody}
            />
        </Snackbar>
      </>
    );
  }
  

export default SnackbarAlert