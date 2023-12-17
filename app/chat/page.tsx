"use client";

import React from "react";
import * as io from "socket.io-client";
import UsersList from "../ui/chat/users-list";
import ChatPage from "../ui/chat/chat-block";
import ChannelList from "../ui/chat/channel-list";

export default function Chat() {
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
          socketID: socket.id,
        });
      });
    }
  }, [socket]);

  return (
    <div className="flex justify-between h-96">
      <ChannelList />
      {socket && <ChatPage socket={socket} />}
      {socket && <UsersList socket={socket} />}
    </div>
  );
}
