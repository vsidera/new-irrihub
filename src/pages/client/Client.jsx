import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Tab, Tabs } from "@material-ui/core";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Switch } from "@material-ui/core";

const pumps = [
  { id: 1, name: "Object 1", mode: "manual", status: "on" },
  { id: 2, name: "Object 2", mode: "auto", status: "off" },
  { id: 3, name: "Object 3", mode: "manual", status: "off" },
];

const valves = [
  { id: 1, name: "Object 1", mode: "manual", status: "on" },
  { id: 2, name: "Object 2", mode: "auto", status: "off" },
  { id: 3, name: "Object 3", mode: "manual", status: "off" },
];



const Clients = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [databulbs, setDatabulbs] = useState([
    { id: 1, name: "Object 1", mode: "manual", status: "on" },
    { id: 2, name: "Object 2", mode: "auto", status: "off" },
    { id: 3, name: "Object 3", mode: "manual", status: "off" }
  ]);

  const handleStatusChange = (id) => (event) => {
    const newStatus = event.target.checked ? "on" : "off";
    if (databulbs.find(bulb => bulb.id === id).status !== newStatus) {
      setDatabulbs(databulbs.map((bulb) => (bulb.id === id ? { ...bulb, status: newStatus } : bulb)));
    }
  };
  

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="container mx-auto mt-12">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Device Details</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Device Action Logs</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="w-full px-4">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Device Controls</h2>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Bulbs" />
              <Tab label="Pumps" />
              <Tab label="Valves" />
            </Tabs>
            {activeTab === 0 && (
        <div>
        <h3 className="text-lg font-bold mb-2">Bulb Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {databulbs.map((bulb) => (
            <div key={bulb.id} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-bold mb-2">{bulb.name}</h4>
              <div className="flex items-center">
                <p className="mr-4">
                  Mode: <span className="font-bold">{bulb.mode}</span>
                </p>
                <div className="flex items-center">
                  <p className="mr-4">
                    Status:{" "}
                    <span
                      className={
                        bulb.status === "on"
                          ? "text-green-500 font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      {bulb.status}
                    </span>
                  </p>
                  <Switch
                    checked={bulb.status === "on"}
                    onChange={handleStatusChange(bulb.id)}
                    color="primary"
                    inputProps={{ "aria-label": "toggle bulb status" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        )}
            {activeTab === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Pump Controls</h3>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Pump 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Bulb 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                </div>
            )}

        {activeTab === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-2">Valve Controls</h3>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Pump 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Bulb 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                </div>
            )}
              </div>
              </div>
              </div>
    </div>
  );
};

export default Clients;
