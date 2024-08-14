"use client";

import { Textarea } from "@/components/ui/textarea";
import SelectCard, { BaseCard } from "./_components/shadcn_card";
import { useState } from "react";
import { Panels } from "./_components/panel";
import { Box_Shadcn } from "./_components/box_shadcn";
import { Button } from "@/components/ui/button";
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
  const [res, setResponse] = useState<any>();

  const sendMessage = async () => {
    if (!newMsg?.trim() || isLoading) return;

    const headers = { "Content-Type": "application/json" };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify([...messages, { role: "user", content: newMsg }]), // future ref: crucial to append correct body details to api call, else routes don't redirect coorectly
      });
      setResponse(res);
    } catch {}

    if (res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      return reader
        .read()
        .then(function processText({ done, value }: { done: any; value: any }) {
          if (done) {
            return result;
          }
          const text = decoder.decode(value || new Uint8Array(), {
            stream: true,
          });
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
          return reader.read().then(processText);
        });
    }

    setLoading(false);
  };

  function handleSendMsg() {
    setLoading(true);
    try {
      setMessages((messages) => [
        ...messages,
        { role: "user", content: newMsg || "" },
        { role: "assistant", content: "" },
      ]);

      setNewMsg("");
    } catch {
      throw new Error("Unable to append chat");
    } finally {
      sendMessage();
    }

    setNewMsg("");
  }

  return (
    <div className="">
      <div className="flex md:flex-row flex-col gap-4 p-4 justify-center items-center ">
        {models.map((item, index) => (
          <SelectCard models={item} setModels={setModels} />
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
