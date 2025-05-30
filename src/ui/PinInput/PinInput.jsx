import React, { useState } from "react";
import OtpInput from 'react-otp-input'
import  "./PinInput.css";


const PinInput = ({ props, placeholder, password, login }) => {
  const [otp, setOtp] = useState('');

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderInput={(props) => <input {...props} />}
      inputStyle="pin-inp"
      containerStyle="pin-inp-wrap"
    />
  );

};

export default PinInput;
