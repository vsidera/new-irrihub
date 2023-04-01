import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";

const SmartFarm = () => {
  return (
    <Sidebar>
      <h1 className="text-2xl text-black mb-6">Smart Farm</h1>
      <h4 className="text-md text-gray-800 font-serif">
        {" "}
        The Smartest Farm in Africa
      </h4>
    </Sidebar>
  );
};

export default SmartFarm;
