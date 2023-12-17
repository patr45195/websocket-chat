"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  const handleLeave = () => {
    localStorage.removeItem('user');
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.leaveBtn} onClick={handleLeave}>Leave chat</button>
      </header>
      <hr />
      <div className={styles.chats}>
        <p className={styles.senderName}>You</p>
        <div className={styles.messageSender}>
          <p>Hello</p>
        </div>
      </div>
      <div className={styles.chats}>
        <p>You</p>
        <div className={styles.messageRecipient}>
          <p>Hi there</p>
        </div>
      </div>
      <div className={styles.messageBlock}>
        <form className={styles.form}>
          <input type="text" className={styles.userMessage} />
          <button className={styles.btn}>Say...</button>
        </form>
      </div>
    </div>
  );
}
