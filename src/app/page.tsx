import {  MessageDemo } from "@/components/message-component";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100  dark:bg-black">
      <MessageDemo/>
      <p className="text-xs"> raunak</p>
    </div>
  );
}
