import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Switch } from "@material-ui/core";

const SmartFarm = () => {

  const [activeTab, setActiveTab] = useState(0);

  const [pumps, setPumps] = useState( [
    { id: 1, name: "Pump 1", mode: "manual", status: "ON", sensor: "20C" },
    { id: 2, name: "Pump 2", mode: "auto", status: "OFF", sensor: "20C" },
    { id: 3, name: "Pump 3", mode: "manual", status: "ON", sensor: "20C" },
  ]);

  const [valves, setValves] = useState( [
    { id: 1, name: "Valve 1", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: 2, name: "Valve 2", mode: "auto", status: "ON" , sensor: "20C"},
    { id: 3, name: "Valve 3", mode: "manual", status: "ON" , sensor: "20C"},
    { id: 4, name: "Valve 4", mode: "manual", status: "ON" , sensor: "20C"},
    { id: 5, name: "Valve 5", mode: "auto", status: "ON" , sensor: "20C"},
    { id: 6, name: "Valve 6", mode: "manual", status: "OFF" , sensor: "20C"},
    { id: 7, name: "Valve 7", mode: "manual", status: "ON" , sensor: "20C"},
    { id: 8, name: "Valve 8", mode: "auto", status: "OFF" , sensor: "20C"},
    { id: 9, name: "Valve 9", mode: "manual", status: "OFF" , sensor: "20C"},
  ]);

  const handleStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (pumps.find((bulb) => bulb.id === id).status !== newStatus) {
      setPumps(
        pumps.map((pump) =>
          pump.id === id ? { ...pump, status: newStatus } : pump
        )
      );
    }
  };

  const handleValveStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (valves.find((bulb) => bulb.id === id).status !== newStatus) {
      setValves(
        valves.map((valve) =>
          valve.id === id ? { ...valve, status: newStatus } : valve
        )
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Farm</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        The Smartest Farm in Africa
      </h4>
      <div className="mt-4">
      <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Manual" />
          <Tab label="Auto" />
        </Tabs>
        {activeTab === 0 && (
          <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pumps-content"
          id="pumps-header"
        >
          <span className="text-lg font-medium"> PUMPS</span>
         
        </AccordionSummary>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {pumps.map((pump) => (
                    <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{pump.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{pump.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                pump.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {pump.status}
                            </span>
                          </p>
                          <Switch
                            checked={pump.status === "ON"}
                            onChange={handleStatusChange(pump.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle pump status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="valves-content"
          id="valves-header"
        > 
        <span className="text-lg font-medium"> VALVES</span>
        </AccordionSummary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {valves.map((valve) => (
                    <div key={valve.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{valve.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{valve.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {valve.status}
                            </span>
                          </p>
                          <Switch
                            checked={valve.status === "ON"}
                            onChange={handleValveStatusChange(valve.id)}
                            color="primary"
                            inputProps={{ "aria-label": "toggle valve status" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      </>
        )}
         {activeTab === 1 && (
          <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pumps-content"
          id="pumps-header"
        >
          <span className="text-lg font-medium"> PUMPS</span>
         
        </AccordionSummary>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {pumps.map((pump) => (
                    <div key={pump.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{pump.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{pump.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                pump.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {pump.status}
                            </span>
                          </p>
                         
                        </div>
                        <p className="mr-4">
                      Sensor: <span className="font-medium">{pump.sensor}</span>
                    </p>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="valves-content"
          id="valves-header"
        > 
        <span className="text-lg font-medium"> VALVES</span>
        </AccordionSummary>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
                  {valves.map((valve) => (
                    <div key={valve.id} className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="text-lg font-normal mb-2">{valve.name}</h4>
                      <div className="flex items-center">
                        <p className="mr-4">
                          Mode: <span className="font-medium">{valve.mode}</span>
                        </p>
                        <div className="flex items-center">
                          <p className="mr-4">
                            Status:{" "}
                            <span
                              className={
                                valve.status === "ON"
                                  ? "text-green-500 font-medium"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {valve.status}
                            </span>
                          </p>
                         
                        </div>
                        <p className="mr-4">
                      Sensor: <span className="font-medium">{valve.sensor}</span>
                    </p>
                      </div>
                    </div>
                  ))}
                </div>

      </Accordion>
      </>
        )}
    </div>
    </Sidebar>
  );
};

export default SmartFarm;
