import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";

const SmartFarm = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [bulbs, setBulbs] = useState([
    { id: 1, name: "Bulb 1", mode: "manual", status: "ON", sensor: "20C" },
    { id: 2, name: "Bulb 2", mode: "auto", status: "OFF" ,sensor: "20C"},
    { id: 3, name: "Bulb 3", mode: "manual", status: "OFF", sensor: "20C" },
    { id: 4, name: "Bulb 2", mode: "auto", status: "ON",sensor: "20C" },
    { id: 5, name: "Bulb 3", mode: "manual", status: "OFF" ,sensor: "20C"},
  ]);

  const handleStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "ON" : "OFF";
    if (bulbs.find((bulb) => bulb.id === id).status !== newStatus) {
      setBulbs(
        bulbs.map((bulb) =>
          bulb.id === id ? { ...bulb, status: newStatus } : bulb
        )
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Home</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        The Smartest Home in Africa
      </h4>
      <div className="mt-4">
        {/* <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Manual" />
          <Tab label="Auto" />
        </Tabs> */}
        {/* {activeTab === 0 && ( */}
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="pumps-content"
              id="pumps-header"
            >
              <span className="text-lg font-medium"> BULBS</span>
            </AccordionSummary>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
              {bulbs.map((bulb) => (
                <div
                  key={bulb.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2"
                >
                  <h4 className="text-lg font-normal mb-2">{bulb.name}</h4>
                  <div className="flex items-center">
                    <p className="mr-4">
                      Mode: <span className="font-medium">{bulb.mode}</span>
                    </p>
                    <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            bulb.status === "ON"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-bold"
                          }
                        >
                          {bulb.status}
                        </span>
                      </p>
                      <Switch
                        checked={bulb.status === "ON"}
                        onChange={handleStatusChange(bulb.id)}
                        color="primary"
                        inputProps={{ "aria-label": "toggle bulb status" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        {/* )} */}
         {/* {activeTab === 1 && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="pumps-content"
              id="pumps-header"
            >
              <span className="text-lg font-medium"> BULBS</span>
            </AccordionSummary>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-1">
              {bulbs.map((bulb) => (
                <div
                  key={bulb.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <h4 className="text-lg font-normal mb-2">{bulb.name}</h4>
                  <div className="flex items-center">
                    <p className="mr-4">
                      Mode: <span className="font-medium">{bulb.mode}</span>
                    </p>
                    <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            bulb.status === "ON"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-bold"
                          }
                        >
                          {bulb.status}
                        </span>
                      </p>
                     
                    </div>
                    <br/>
                    <p className="mr-4">
                      Sensor: <span className="font-medium">{bulb.sensor}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        )} */}
      </div>
    </Sidebar>
  );
};

export default SmartFarm;
