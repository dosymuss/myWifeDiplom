import React, { useState } from "react";
import style from "./Input.module.css";
import eyeOpen from "../../assets/auth/eyeOpen.svg";
import eyeClose from "../../assets/auth/eyeClose.svg";
import { Link } from 'react-router-dom'

const Input = ({ title, placeholder, password, login, err, ...props }) => {
  const [type, setType] = useState("password");

  const handleChange = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const [text, setText] = useState("loading");
  const changeText = (item) => {
    setText(item);
  };

  if (password) {
    return (
      <div className={style.passInp}>
        <div className={style.signUpForgetten}>
          <p className={style.inpTitle}>{title}</p>
          {/* {login ? <Link to="#">Forgetten password</Link> : null} */}
        </div>
        <div className={style.inputPass}>
          <input type={type} placeholder={placeholder} {...props} />
          <button onClick={handleChange}>
            <img src={type === "text" ? eyeOpen : eyeClose} alt="" />
          </button>
        </div>
        {err && <p className={style.errText}>{err}</p>}
      </div>
    );
  } else {
    return (
      <div className={style.textInp}>
        <p className={style.inpTitle}>{title}</p>
        <input type="text" placeholder={placeholder} {...props} />
        {err && <p className={style.errText}>{err}</p>}
      </div>
    );
  }
};

export default Input;
