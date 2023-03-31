export const {REACT_APP_SUSS_URL } = process.env;

export default {
    LOGIN_URL: `${REACT_APP_SUSS_URL}/public/user/token`,
    LIST_CONTACTS: `${REACT_APP_SUSS_URL}/api/v1/contact`,
    CREATE_CONTACT: `${REACT_APP_SUSS_URL}/api/v1/contact`,
    CREATE_USER: `${REACT_APP_SUSS_URL}/api/v1/user/:app_id/registration`,
    BROADCAST_MESSAGE: `${REACT_APP_SUSS_URL}/api/v1/message/:sid/broadcast/send`,
    UPLOAD_CONTACTS: `${REACT_APP_SUSS_URL}api/v1/contact`,
    LIST_MESSAGES: `${REACT_APP_SUSS_URL}/api/v1/message`,
    LIST_APP_SERVICES: `${REACT_APP_SUSS_URL}/api/v1/application?page=1&limit=20`,
    USER_ATTACH: `${REACT_APP_SUSS_URL}api/v1/application`,
    SERVICE_ATTACH: `${REACT_APP_SUSS_URL}api/v1/application`,
    CREATE_SERVICE: `${REACT_APP_SUSS_URL}/api/v1/service/create`,
    CREATE_APP: `${REACT_APP_SUSS_URL}/api/v1/application/create`,
    SEND_SMS: `${REACT_APP_SUSS_URL}api/v1/message/2/user/send`,
    LIST_APPLICATIONS: `${REACT_APP_SUSS_URL}api/v1/application/3/list`,
    LIST_SERVICES: `${REACT_APP_SUSS_URL}/api/v1/service/3/list`,
    USER_APPS: `${REACT_APP_SUSS_URL}/api/v1/users/application/list`,
    USER_SEARCH: `${REACT_APP_SUSS_URL}api/v1/application`,
    SERVICE_SEARCH: `${REACT_APP_SUSS_URL}api/v1/service`
};