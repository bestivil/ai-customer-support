import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

export const OpenAI_POST = ({
  messages,
  setMessages,
}: {
  messages: { role: string; content: string }[];
  setMessages: (array: { role: string; content: string }[]) => void;
}) => {
  const headers = { "Content-Type": "application/json" };
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ messages }),
      }).then(async (res) => {
        const reader = res.body?.getReader(); // reader reads res body
        const decoder = new TextDecoder(); // decoder converts text
        let result = "";
        const [streamRead, setStreamRead] = useState<boolean>(false);

        while (!streamRead) {
          const { done, value } = await reader?.read()!;
          console.log(value);
          setStreamRead(done);

          if (value) {
            const text = decoder.decode(value || new Uint8Array(), {
              stream: true,
            });
            let lastMsg = messages[messages.length - 1];

            setMessages([
              ...messages,
              { ...lastMsg, content: lastMsg.content.concat(text) },
            ]);
          }
        }
      }),
  });

  if (error) console.log("Error occured:" + error.message);
};
