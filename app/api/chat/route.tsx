import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// messages sent to OpenAI API so it can understand the context of the messagess
const systemPrompts =
  "You are an AI-powered chatbot where you help students with Leetcode sytle interview questions.";

export async function POST(req: Request) {
  const openai = new OpenAI();
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompts }, ...data],
    model: "gpt-4o-mini",
    stream: true,
  });

  // streams a chunk of text in sections
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0].delta.content;

          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch {
        controller.error("Failed streaming");
      } finally {
        controller.close();
      }
    },
  });
  return new NextResponse(stream);
}
