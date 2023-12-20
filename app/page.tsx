"use client";

import React, { FormEvent } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [user, setUser] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { data } = await axios.get<boolean>(
      "http://localhost:5000/freeUserName",
      {
        params: { userName: user.trim() },
      }
    );

    const canCreateUser = data;

    if (canCreateUser) {
      localStorage.setItem("user", user.trim());
      router.push("/chat");
    } else {
      setUser("");
      alert("Nickname is busy, come up with another nickname.");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-2">Enter chat</div>
        <div className="mb-2">
          <label htmlFor="userName"></label>
          <input
            id="userName"
            placeholder="Input your name..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <Button type="submit" variant="contained">Go</Button>
      </form>
    </main>
  );
}
