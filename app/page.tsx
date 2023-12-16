import Link from "next/link";
import { Button } from "./ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-2">Enter chat</div>
        <form className="flex flex-col items-center">
          <div className="mb-2">
            <input
              id="userName"
              placeholder="Input your name..."
              className="border p-2 rounded-md"
            />
          </div>
          <Link href="/chat">
            <Button type="submit">Go</Button>
          </Link>
        </form>
      </div>
    </main>
  );
}
