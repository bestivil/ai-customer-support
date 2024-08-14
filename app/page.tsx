"use client";

import { Textarea } from "@/components/ui/textarea";
import SelectCard, { BaseCard } from "./elements/shadcn_card";
import { useState } from "react";
import { Panels } from "./elements/panel";
import { Box_Shadcn } from "./elements/box_shadcn";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

import { dformat } from "./util/datetime";
import { ErrorToast } from "./util/error_message";
import { ToastContainer } from "react-toastify";

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

    if (res) {
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
    } else {
      setMessages(() => {
        let lastMessage = messages[messages.length - 1];
        return [{ ...lastMessage, content: lastMessage.content + "" }];
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

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] m-4 max-w-[95%] rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-col h-full items-center justify-start p-6">
            <div className="font-semibold">Chat History</div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full p-2 ">
            <div className="mb-8">
              <BaseCard
                cn={"mt-3 top-0"}
                size=" bg-slate-100 w-fit h-16 font-bold"
                msg={{ content: dformat }}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.map((item, index) => (
                <BaseCard key={index} msg={item} cn={"flex mx-[10px] mt-2"} />
              ))}
            </div>

            <div className="sticky bottom-0 left-0 w-full bg-white p-4 ">
              <Textarea
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleSendMsg} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
