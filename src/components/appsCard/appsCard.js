import React from "react";

function AppsCard({ imei_code,device_type_id}) {
  return (

<div className="flex flex-col items-center">
  <h2 className="text-lg text-blue-800">
    {imei_code}
  </h2>
  <h4>
    {device_type_id === 1 && "smart home"}
    {device_type_id === 2 && "smart farm"}
    {device_type_id === 3 && "water pan"} 
  </h4>
</div>


  );
}

export default AppsCard;
