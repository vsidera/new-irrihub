import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { Accordion, AccordionSummary, Tab, Tabs } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Switch } from "@material-ui/core";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";
import { deviceDataLogs } from "../../actions/device/deviceAction";

const SmartFarm = () => {

  const imei = 863576044816911

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventMessage, setEventMessage] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const [bulbs, setBulbs] = useState([
    { id: "b1", name: "Bulb 1", uuid:"b1", mode: "manual", status: "", sensor: "20C", subtopic: "", value: "" , device_imei: ""},
    { id: "b2", name: "Bulb 2", uuid:"b2", mode: "manual", status: "" ,sensor: "20C", subtopic: "", value:"",  device_imei: ""},
    { id: "b3", name: "Bulb 3", uuid:"b3", mode: "manual", status: "", sensor: "20C", subtopic: "" , value: "",  device_imei: ""},
    { id: "b4", name: "Bulb 4", uuid:"b4", mode: "manual", status: "",sensor: "20C", subtopic: "", value: "",  device_imei: "" },
  ]);

  console.log("SUBTOPICS IS!!!!!!!!", bulbs[0].value)


  const handleStatusChangeAndSwitch = (subtopic) => (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? "ON" : "OFF";
    const newValue = isChecked ? "1" : "0";
    const bulb = bulbs.find((bulb) => bulb.subtopic === subtopic);
  
    if (bulb.value !== newValue) {
      setBulbs(
        bulbs.map((b) => (b.subtopic === subtopic ? { ...b, value: newValue } : b))
      );
  
      const cmdBody = {
        imei: "863576044816911",
        command: subtopic,
        value: newValue.toString(),
      };
      sendCommand(cmdBody)
        .then((res) => {
          if (res.status === 200) {
            setEventType("success");
            setEventMessage("Command Successfully Sent");
            setEventTitle("SEND COMMAND");
            setIsSnackBarAlertOpen(true);
          } else {
            setEventType("fail");
            setEventMessage("COMMAND NOT SENT");
            setEventTitle("SEND COMMAND");
            setIsSnackBarAlertOpen(true);
          }
        })
        .catch((err) => console.error(err));
    }
  };
  

  const getDataLogs = () => {

    deviceDataLogs(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          const filteredData = res.data.filter(obj => ['b1', 'b2', 'b3', 'b4'].includes(obj.subtopic));
          setBulbs(filteredData);
  
         
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataLogs();
    setIsLoaded(true)

  }, []);




  return (
    <>
    <SnackbarAlert
    open={isSnackBarAlertOpen}
    type={eventType}
    message={eventMessage}
    handleClose={() => setIsSnackBarAlertOpen(false)}
    title={eventTitle}
  />
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Home</h1>
      <h4 className="text-md text-blue-900 font-serif">
        {" "}
        The Smartest Home in Africa
      </h4>
      <div className="mt-4">
     
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
                  <h4 className="text-lg font-normal mb-2">{bulb.device_imei}</h4>
                  <div className="flex items-center">
                    <p className="mr-4">
                      ID: <span className="font-medium">{bulb.id}</span>
                    </p>
                    <div className="flex items-center">
                      <p className="mr-4">
                        Status:{" "}
                        <span
                          className={
                            bulb.value === "1"
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {bulb.value ==="1" ? "ON" : "OFF"}
                          {/* {bulb.value} */}
                        </span>
                      </p>
                      <Switch
                        checked={bulb.value === "1"}
                        onChange={handleStatusChangeAndSwitch(bulb.subtopic)}
                        color="primary"
                        inputProps={{ "aria-label": "toggle bulb status" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        
      </div>
    </Sidebar>
    </>
  );
};

export default SmartFarm;
