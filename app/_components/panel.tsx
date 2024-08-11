import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

export function Panels() {
  // static array during development stages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, welcome to the AI chatbot, how can I help you today?",
    },
    {
      role: "assistant",
      content: "Hi, ",
    },
  ]);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] m-4 max-w-[95%] rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
