"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import React, { use } from "react";
import * as io from "socket.io-client";

interface UserType {
  user: string;
  socketID: string;
}

export default function UsersList({ socket }: { socket: io.Socket }) {
  const [users, setUsers] = React.useState<UserType[] | []>([]);

  React.useEffect(() => {
    socket.on("usersChange", (users) => {
      setUsers(users);
    });
  }, [socket, users]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Users list</p>
      <div>
        {users.map((element: UserType) => {
          return (
            <div className={styles.userBlock} key={element.socketID}>
              <Image
                src={"/users/user1.png"}
                alt={`user name`}
                className="mr-4 rounded-full"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p className="text-left text-sm font-semibold md:text-base break-words">
                  {element.user}
                </p>
              </div>
              {element.user === localStorage.getItem("user") && (
                <span>(you)</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
