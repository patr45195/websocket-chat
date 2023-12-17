"use client";

import * as io from "socket.io-client";
import React, { FormEvent } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

interface messagesType {
  text: string;
  name: string;
  messageID: string;
}

export default function ChatPage({ socket }: { socket: io.Socket }) {
  const router = useRouter();

  const [input, setInput] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [messages, setMessages] = React.useState<messagesType[]>([]);

  const isTyping = () => {
    socket.emit("typing", `${localStorage.getItem("user")} is typing`);
  };

  const handleLeave = () => {
    localStorage.removeItem("user");
    socket.disconnect();
    router.push("/");
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() && localStorage.getItem("user")) {
      socket.emit("message", {
        text: input,
        name: localStorage.getItem("user"),
        messageID: `${socket.id}-${Math.random()}`,
        socketId: socket.id,
      });
    }

    setInput("");
  };

  React.useEffect(() => {
    socket.on("response", (userMessage) => setMessages([...messages, userMessage]));
  }, [socket, messages]);

  React.useEffect(() => {
    socket.on("responseTyping", (data) => {
      setStatus(data);
      setTimeout(() => setStatus(""), 3000);
    });
  }, [socket]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.leaveBtn} onClick={handleLeave}>
          Leave chat
        </button>
      </header>
      <hr />
      {messages.map((element: messagesType) =>
        element.name === localStorage.getItem("user") ? (
          <div key={element.messageID} className={styles.chats}>
            <p className={styles.senderName}>You</p>
            <div className={styles.messageSender}>
              <p>{element.text}</p>
            </div>
          </div>
        ) : (
          <div key={element.messageID} className={styles.chats}>
            <p className={styles.recipientName}>{element.name}</p>
            <div className={styles.messageRecipient}>
              <p>{element.text}</p>
            </div>
          </div>
        )
      )}
      <div className={styles.status}>
        <p>{status}</p>
      </div>
      <div className={styles.messageBlock}>
        <form onSubmit={handleSend} className={styles.form}>
          <input
            className={styles.userMessage}
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={isTyping}
          />
          <button className={styles.btn}>Say...</button>
        </form>
      </div>
    </div>
  );
}
