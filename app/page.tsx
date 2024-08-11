"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import SelectCard, { BaseCard } from "./_components/shadcn_card";
import { useState } from "react";
import { Panels } from "./_components/panel";
import { Box_Shadcn } from "./_components/box_shadcn";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [models, setModels] = useState([
    { name: "OpenAI", active: true },
    { name: "Claude", active: false },
  ]);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, welcome to the AI chatbot, how can I help you today?",
    },
  ]);

  const [newMsg, setNewMsg] = useState<string>();

  function handleSendMsg() {
    setNewMsg("");
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
        <BaseCard msg={item} cn={"flex mx-[10px]"} />
      ))}

      <Textarea
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        className="mt-4"
      />
      <Button onClick={handleSendMsg} className="mt-4 mx-4 w-full">
        {/* TODO: implement loading state */}
        Send
      </Button>
    </div>
  );
}
