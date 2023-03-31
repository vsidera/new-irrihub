import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function appservicesAction(app_id) {
  const appServicesUrl = `${apiUrl.LIST_APP_SERVICES}/${app_id}/service/list`;
    const config = authHeaders();
  
    return axios
      .get(appServicesUrl, config)
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