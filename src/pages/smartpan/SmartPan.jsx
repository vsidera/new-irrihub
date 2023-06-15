import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import WaterPool from "../../components/utils/pool";

const SmartPan = () => {

  const waterLevel = '80%'

    return(
        <>
         <Sidebar>
         <h1 className="text-2xl text-black mb-6">Water Pan</h1>
        <h4 className="text-md text-blue-900 font-serif mb-4">
          {" "}
          The Smartest Pan in Africa
        </h4>
        <WaterPool waterLevel={waterLevel}/>
        </Sidebar>
        </>

    );

}

export default SmartPan;