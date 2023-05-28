import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { closeChat } from "../slices/chatSlice";
import styles from "../assets/styles/components/ChatBox.module.scss";
let socket;

const ChatBox = ({ roomId: roomIdProp }) => {
  const dispatch = useDispatch();
  const { roomId: roomIdState, isOpen } = useSelector((state) => state.chat);
  const roomId = roomIdProp || roomIdState;

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    socket = io(
      process.env.NEXT_PUBLIC_APP_BACKEND_URL || "http://localhost:3001"
    );

    socket.on("welcome", (data) => {
      setChat((prevChat) => [...prevChat, data.message]);
    });

    // use roomId here instead of tutorId
    socket.emit("join room", { roomId });
    socket.on("new message", (data) => {
      console.log("Received new message", data);
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, [isOpen, roomId]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("message", { message, roomId });
      setMessage("");
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseChat = () => {
    dispatch(closeChat());
  };

  if (!isOpen) return null;

  return (
    <div
      className={isExpanded ? styles.chatBoxExpanded : styles.chatBoxCollapsed}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {isExpanded && (
        <button className={styles.closeChatButton} onClick={handleCloseChat}>
          Close
        </button>
      )}

      {isExpanded && (
        <>
          <div className={styles.chatBoxHeader} onClick={toggleExpand}>
            Chat
          </div>
          <div className={styles.chatBoxBody}>
            {chat.map((payload, index) => (
              <div key={index}>
                <p>{payload}</p>
              </div>
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
