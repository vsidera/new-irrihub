import React from "react";
import Thermometer from "react-thermometer-component";

export default function Visual() {
  return (
    <div className="Visual">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Thermometer
          theme="light"
          value="75"
          max="100"
          size="medium"
          height="150"
          steps="5"
          reverseGradient={true}
          style={{ transform: 'rotate(90deg)' }}
        />
      </div>
    </div>
  );
}
