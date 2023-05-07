import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";

const SmartPan = () => {

    return(
        <>
         <Sidebar>
         <h1 className="text-2xl text-black mb-6">Smart Pan</h1>
        <h4 className="text-md text-blue-900 font-serif">
          {" "}
          The Smartest Pan in Africa
        </h4>
        </Sidebar>
        </>

    );

}

export default SmartPan;