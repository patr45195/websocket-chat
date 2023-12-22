"use client";

import React from "react";
import * as io from "socket.io-client";
import UsersList from "../ui/chat/users-list";
import ChatPage from "../ui/chat/chat-block";
import Description from "../ui/chat/description-block";
import isAuth from "../common/HOC/isAuth";

const Chat = () => {
  const [socket, setSocket] = React.useState<io.Socket | null>(null);

  React.useEffect(() => {
    const newSocket = io.connect("http://localhost:5000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("newUser", {
          user: localStorage.getItem("user"),
          userAvatar:
            localStorage.getItem("userAvatar") || "/users/defaultUser.png",
          socketID: socket.id,
        });
      });
    }
  }, [socket]);

  return (
    <div className="flex justify-between h-96">
      <Description />
      {socket && <ChatPage socket={socket} />}
      {socket && <UsersList socket={socket} />}
    </div>
  );
};

export default isAuth(Chat);
