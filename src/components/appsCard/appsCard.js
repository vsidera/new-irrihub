import React from "react";

function AppsCard({ imei_code,device_type_id}) {
  return (

      <div>
      <h2 className="text-lg text-blue-800">
        
        {imei_code}
      </h2>
      <h4>
      {device_type_id === 0 && "SMART HOME"}
        {device_type_id === 2 && "SMART FARM"}
        {device_type_id === 3 && "WATER PAN"} 
      </h4>

      </div>

  );
}

export default AppsCard;
