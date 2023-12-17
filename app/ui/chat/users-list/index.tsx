"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import React from "react";
import * as io from "socket.io-client";

interface UserType {
  user: string;
  socketID?: string;
}

export default function UsersList({ socket }: { socket: io.Socket }) {
  const [users, setUsers] = React.useState<UserType[]>([]);

  React.useEffect(() => {
    socket.on("responseNewUser", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className={styles.container}>
      Users list
      <div>
        {users.map((element: any) => {
          return (
            <div className="flex items-center p-3" key={Math.random()}>
              <Image
                src={"/users/user1.png"}
                alt={`user name`}
                className="mr-4 rounded-full"
                width={32}
                height={32}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">
                  {element.user}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
