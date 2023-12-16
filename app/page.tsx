import { Button } from "./ui/button";

export default function Home() {
  return (
    <main>
      <div>Enter chat</div>
      <form>
        <div>
          <input id="userName" placeholder="Input your name..." />
        </div>
        <Button type="submit">Go</Button>
      </form>
    </main>
  );
}
