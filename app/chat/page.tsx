"use client";

import React from "react";
import * as io from "socket.io-client";
import UsersList from "../ui/chat/users-list";
import ChatPage from "../ui/chat/chat-block";
import ChannelList from "../ui/chat/channel-list";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  return (
    <div className="flex justify-between">
      <ChannelList />
      <ChatPage />
      <UsersList />
    </div>
  );
}
