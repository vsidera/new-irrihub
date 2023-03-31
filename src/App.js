import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/admin";
import Contacts from "./pages/contacts/Contacts";
import Messages from "./pages/messages/Messages";
import AppServices from "./pages/app_services/app_services";
import Applications from "./pages/applications/Applications";
import AllApps from "./pages/applications/AllApps";
import Customers from "./pages/customers/Customers"
import Devices from "./pages/devices/Devices"
import Clients from "./pages/client/Client";

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path='/login' exact element={<Login/>} />
          <Route path="admin" element={<Home/>} />
          {/* <Route path='admin' element={<Admin />} exact /> */}
          <Route path='apps/:id/contacts' element={<Contacts/>} />
          <Route path='apps/:id/messages' element={<Messages/>} />
          <Route path='apps/:id/appservices' element={<AppServices/>} />
          <Route path='apps' element={<Applications/>} />
          <Route path='apps/:id/all-apps' element={<AllApps/>} />
          <Route path='users' element={<Users/>} />
          <Route path='customers' element={<Customers/>} />
          <Route path='devices' element={<Devices/>} />
          <Route path='client' element={<Clients/>} />
  
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
