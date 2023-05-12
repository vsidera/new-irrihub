import React from "react";
import Thermometer from "react-thermometer-chart";

export default function ThermometerThree() {
  return (
    <div>
      <Thermometer
        width="100px"
        height="250px"
        steps={5}
        minValue={0}
        maxValue={100}
        currentValue={74}
        color="blue"
      />
    </div>
  );
}