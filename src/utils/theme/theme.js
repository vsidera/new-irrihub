import { createTheme, ThemeProvider } from '@mui/material/styles';

export function getMuiTheme (){
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#FFFFFF',
              fontFamily: 'Ubuntu',
              fontWeight: 'inherit'
            },
            footer: {
              border: 0
            }
          }
        },
        //@ts-ignore
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              textAlign: 'center',
              alignItems: 'center',
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              // fontFamily: 'Ubuntu',
              color: '#ffffff',
              justifyContent: 'start',
              // fontWeight: 'bold',
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            regular: {
              ['@media (min-width:600px)']: { // eslint-disable-line no-useless-computed-key
                paddingLeft: '0px',
                paddingRight: '0px',
                // minHeight:'3px',
                marginBottom: '2px',
                marginTop: '0px',
              }

            }
          }
        },
 
        //@ts-ignore
        MUIDataTableSelectCell: {
          styleOverrides: {
            headerCell: {
              backgroundColor: '#5f6062',
              color: 'wh',
            },
          },
        },

        MUIDataTable: {
          styleOverrides: {
            responsiveBase: {
              position: 'relative',
              height: 'auto',
              borderRadius: '18px',
              border: '1px solid #f2f2f2',
              boxShadow: '0 0 6px 4px #efefef'
            },
          },
        },
        MUIDataTablePagination: {
          styleOverrides: {
            navContainer: {
              border: 0,
              boxShadow: '0 '
            },
          },
        },
        MuiCardHeader: {
          styleOverrides: {
            title: {
              fontFamily: 'Ubuntu',
              display: 'flex'
            },
            avatar: {
              paddingLeft: 26,
              fontFamily: 'Ubuntu',
            }
          },
        }

      }
    });
}
