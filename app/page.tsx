"use client";

import React, { FormEvent } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = React.useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("user", user);
    router.push("/chat");
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
        <Button type="submit">Go</Button>
      </form>
    </main>
  );
}
