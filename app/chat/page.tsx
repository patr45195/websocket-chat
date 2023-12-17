"use client";

import React from "react";
import * as io from "socket.io-client";
import UsersList from "../ui/chat/users-list";
import ChatPage from "../ui/chat/chat-block";
import ChannelList from "../ui/chat/channel-list";

export default function Chat() {
  const socket = io.connect("http://localhost:5000");
  
  React.useEffect(() => {
    socket.emit("newUser", {
      user: localStorage.getItem("user"),
      socketID: socket.id,
    });
  }, []);

  return (
    <div className="flex justify-between">
      <ChannelList />
      <ChatPage socket={socket} />
      <UsersList socket={socket} />
    </div>
  );
}
