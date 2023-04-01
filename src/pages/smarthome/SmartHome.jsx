import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";

const SmartHome = () => {
  return (
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Home</h1>
      <h4 className="text-md text-gray-800 font-serif">
        {" "}
        The Smartest Home in Africa
      </h4>
    </Sidebar>
  );
};

export default SmartHome;
