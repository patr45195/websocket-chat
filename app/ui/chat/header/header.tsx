import Link from "next/link";

export default function Header() {
  return (
    <Link href={"/"}>
      <div className="bg-blue-500 rounded-lg w-full p-3">
        <span className="text-xl text-white font-semibold">WebsocketChat</span>
      </div>
    </Link>
  );
}
