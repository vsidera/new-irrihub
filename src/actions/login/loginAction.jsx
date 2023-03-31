import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function loginAction(formValues) {
    const loginUrl = apiUrl.LOGIN_URL;
  
    return axios
      .post(loginUrl, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {
          
          localStorage.setItem('key', JSON.stringify(res.data.token));
          localStorage.setItem('loginTime', new Date().getTime());
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The credentials you have entered are not correct.',
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

  export function userCreate(formValues) {
    const userCreateUrl = apiUrl.CREATE_USER;
    const config = authHeaders();
  
    return axios
      .post(userCreateUrl, formValues, config)
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
              _error: 'The user could not be created.',
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

  export function userAttach(formValues) {
    console.log("FORMVALUES ARE!!!!!!", formValues)
    const attachUrl = `${apiUrl.USER_ATTACH}/${formValues.app_id}/user/add`;
    const config = authHeaders();
  
    return axios
      .put(attachUrl, formValues.data, config)
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
              _error: 'The user could not be created.',
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

  export function userSearch(formValues) {
    const searchUrl = `${apiUrl.USER_SEARCH}/${formValues.app_id}/user/search?email=${formValues.search}`;
    const config = authHeaders();
  
    return axios
      .get(searchUrl, config)
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
              _error: 'The user could not be created.',
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


