import React, { useState } from "react";
import OtpInput from 'react-otp-input'
import "./PinInput.css";


const PinInput = ({ props, placeholder, password, login, value, setValue }) => {

  return (
    <div>
      <p className="pin-inp-text">Ваш код для входа</p>
      <OtpInput
        value={value}
        onChange={setValue}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputStyle="pin-inp"
        containerStyle="pin-inp-wrap"
      />
    </div>
  );

};

export default PinInput;
