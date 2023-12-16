import styles from "./styles.module.scss";

export default function ChannelList() {
  return (
    <div className={styles.container}>
      <div>Channel list</div>
      <div className={styles.group}>
        <p className={styles.title}>
          Message Group 1
        </p>
        <p className={styles.subtitle}>Last message...</p>
      </div>
      <div className={styles.group}>
        <p className={styles.title}>
          Message Group 2
        </p>
        <p className={styles.subtitle}>Last message...</p>
      </div>
    </div>
  );
}
