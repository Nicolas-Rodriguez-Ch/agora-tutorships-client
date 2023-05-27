import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import styles from "../assets/styles/components/ChatBox.module.scss";
let socket;

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });

    return () => {
      socket.emit("no longer connected");
      socket.off();
    };
  }, [chat]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={isExpanded ? styles.chatBoxExpanded : styles.chatBoxCollapsed}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {isExpanded && (
        <>
          <div className={styles.chatBoxHeader} onClick={toggleExpand}>
            Chat
          </div>
          <div className={styles.chatBoxBody}>
            {chat.map((payload, index) => (
              <div key={index}>{payload}</div>
            ))}
          </div>
          <form className={styles.chatBoxForm} onSubmit={sendMessage}>
            <input
              className={styles.chatBoxInput}
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className={styles.chatBoxButton} type="submit">
              Send
            </button>
          </form>
        </>
      )}
      {!isExpanded && <div className={styles.chatBoxLabel}>Chat</div>}
    </div>
  );
};

export default ChatBox;
