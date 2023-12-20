"use client";

import * as io from "socket.io-client";
import React, { FormEvent } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { KeyboardEvent } from "react";
import AlertDialog from "../../alertDialog";
import { getFormatedDate } from "@/app/utils/getFormatedDate";

interface messagesType {
  text: string;
  name: string;
  messageID: string;
  socketId: string;
  date: number;
}

export default function ChatPage({ socket }: { socket: io.Socket }) {
  const router = useRouter();

  const [input, setInput] = React.useState("");
  const [typingStatus, setTypingStatus] = React.useState("");
  const [messages, setMessages] = React.useState<messagesType[]>([]);

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
        date: Date.now(),
      });
    }

    setInput("");
  };

  const isTyping = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      socket.emit("typing", `${localStorage.getItem("user")} is typing...`);
    }
  };

  React.useEffect(() => {
    socket.on("responseTyping", (data) => {
      setTypingStatus(data);
      setTimeout(() => setTypingStatus(""), 3000);
    });
  }, [socket]);

  React.useEffect(() => {
    socket.on("response", (usersMessages) => setMessages(usersMessages));
  }, [socket, messages]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AlertDialog socket={socket} />
        <Button sx={{ width: "150px" }} onClick={handleLeave} color="error">
          Leave chat
        </Button>
      </header>
      <div className={styles.hrLine}>
        <hr />
        <div className={styles.typingStatus}>
          <p>{typingStatus}</p>
        </div>
      </div>
      <div className={styles.chatsBlock}>
        {messages.map((element: messagesType, index: number) =>
          element.name === localStorage.getItem("user") ? (
            <div key={element.messageID} className={styles.chats}>
              {/* Выводить имя отправителя только 1 раз, если от него несколько сообщений подряд */}
              {index > 0 && element.name === messages[index - 1].name ? (
                ""
              ) : (
                <p className={styles.senderName}>You</p>
              )}
              <div className={styles.messageSender}>
                <p>{element.text}</p>
                <span className={styles.date}>
                  {getFormatedDate(element.date)}
                </span>
              </div>
            </div>
          ) : (
            <div key={element.messageID} className={styles.chats}>
              {/* Выводить имя отправителя только 1 раз, если от него несколько сообщений подряд */}
              {index > 0 && element.name === messages[index - 1].name ? (
                ""
              ) : (
                <p className={styles.recipientName}>{element.name}</p>
              )}
              <div className={styles.messageRecipient}>
                <p>{element.text}</p>
                <span className={styles.date}>
                  {getFormatedDate(element.date)}
                </span>
              </div>
            </div>
          )
        )}
      </div>
      <div className={styles.messageBlock}>
        <form onSubmit={handleSend} className={styles.form}>
          <input
            className={styles.userInput}
            type="text"
            value={input}
            placeholder="Write a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={isTyping}
          />
          <Button
            sx={{ height: "50px", width: "150px", marginLeft: "5px" }}
            type="submit"
            variant="outlined"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
