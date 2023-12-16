import Header from "../ui/chat/header/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header />
      <div className="">{children}</div>
    </div>
  );
}
