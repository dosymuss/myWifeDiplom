import style from "./ProfileText.module.css";
import React from "react";

const ProfileText = ({textProfile, infaProfile}) => {
  return (
    <div className={style.ProfileTextWrap}>
      <p className={style.textProfile}>{textProfile}</p>
      <span className={style.infaProfile}>{infaProfile}</span>
    </div>
  );
};

export default ProfileText;
