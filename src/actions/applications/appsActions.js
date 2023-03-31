import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function appsAction(formValues) {
    const appsUrl = `${apiUrl.LIST_APPLICATIONS}?page=${formValues.page}&limit=${formValues.limit}`;
    const config = authHeaders();
  
    return axios
      .get(appsUrl, config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function userApps() {
    const appsUrl = `${apiUrl.USER_APPS}`;
    const config = authHeaders();
  
    return axios
      .get(appsUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function appCreate(formValues) {
    const appCreateUrl = apiUrl.CREATE_APP;
    const config = authHeaders();
  
    return axios
      .post(appCreateUrl, formValues, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The app could not be created.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }  