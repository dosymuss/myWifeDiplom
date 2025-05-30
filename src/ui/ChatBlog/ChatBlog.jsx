import React from "react";
import styles from "./ChatBlog.module.css";
import ava from "../../assets/sidebar/ava.jpg";

const ChatBlog = () => {
  return (
    <div className={styles.chatBlogWrap}>
      <div className={styles.avaChats}>
        <img src={ava} alt="" />
      </div>
      <div className={styles.nickChat}>
        Nurzhan
        <p>dolt</p>
      </div>
    </div>
  );
};

export default ChatBlog;
