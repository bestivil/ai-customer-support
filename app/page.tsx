"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import SelectCard, { BaseCard } from "./_components/shadcn_card";
import { useState } from "react";
import { Panels } from "./_components/panel";
import { Box_Shadcn } from "./_components/box_shadcn";
import { Button } from "@/components/ui/button";
import OpenAI_POST from "./backend/send_msg";
import { stringify } from "querystring";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [models, setModels] = useState([
    { name: "OpenAI", active: true },
    { name: "Claude", active: false },
  ]);

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: "Hi, welcome to the AI chatbot, how can I help you today?",
      },
    ]
  );

  const [newMsg, setNewMsg] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleSendMsg() {
    setLoading(true);
    try {
      setMessages((messages) => [
        ...messages,
        { role: "user", content: newMsg || "" },
        { role: "assistant", content: "" },
      ]);
    } catch {
      throw new Error("Unable to append chat");
    } finally {
      OpenAI_POST({ messages, setMessages });
    }

    setNewMsg("");

    setTimeout(() => setLoading(false), 3000); //TODO: artificial
  }

  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-4 p-4 justify-center items-center ">
        {models.map((item, index) => (
          <SelectCard models={item} />
        ))}
      </div>

      <Panels />
      <Box_Shadcn />

      {messages.map((item, index) => (
        <BaseCard msg={item} cn={"flex mx-[10px] mt-2"} />
      ))}

      <Textarea
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        className="mt-4"
      />
      <Button onClick={handleSendMsg} className="mt-4 mx-4 w-full">
        {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
      </Button>
    </div>
  );
}
