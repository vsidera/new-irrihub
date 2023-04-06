import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users"
import Home from "./pages/home/Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/customers/Customers"
import Devices from "./pages/devices/Devices"
import SmartHome from "./pages/smarthome/SmartHome";
import SmartFarm from "./pages/smartfarm/SmartFarm";
import Analytics from "./pages/analytics/Analytics";
import Profile from "./pages/profile/Profile";
import UserDevices from "./pages/user-devices/UserDevices";

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
        <Routes>
          <Route path='/login' exact element={<Login/>} />
          <Route path="client-devices/:id" element={<Home/>} />
          <Route path='users' element={<Users/>} />
          <Route path='customers' element={<Customers/>} />
          <Route path='devices' element={<Devices/>} />
          <Route path='smartfarm' element={<SmartFarm/>} />
          <Route path='smarthome' element={<SmartHome/>} />
          <Route path='analytics' element={<Analytics/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='user-devices' element={<UserDevices/>} />
  
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
