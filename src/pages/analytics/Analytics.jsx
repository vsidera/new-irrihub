import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";

const Analytics = () => {

  return (
    <Sidebar>
    <h1 className="text-2xl text-black mb-6">Analytics</h1>
      <h4 className="text-md text-gray-800 font-serif">
        {" "}
        Information about Irrihub & its products
      </h4>
    </Sidebar>
  );
};

export default Analytics;
