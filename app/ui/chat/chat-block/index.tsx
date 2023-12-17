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
  const [messages, setMessages] = React.useState<messagesType[]>([]);

  const handleLeave = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  React.useEffect(() => {
    socket.on("response", (data) => setMessages([...messages, data]));
    console.log(messages);
  }, [socket, messages]);

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
            <p>{element.name}</p>
            <div className={styles.messageRecipient}>
              <p>{element.text}</p>
            </div>
          </div>
        )
      )}

      <div className={styles.messageBlock}>
        <form onSubmit={handleSend} className={styles.form}>
          <input
            className={styles.userMessage}
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles.btn}>Say...</button>
        </form>
      </div>
    </div>
  );
}
