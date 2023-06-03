import React from "react";

function AppsCard({ imei_code}) {
  return (

      <div>
      <h2 className="text-lg text-blue-800">
        {/* {device_type_id === 1 && "SMART HOME"}
        {device_type_id === 2 && "SMART FARM"}
        {device_type_id === 3 && "WATER PAN"} */}
        {imei_code}
      </h2>

      </div>

  );
}

export default AppsCard;
