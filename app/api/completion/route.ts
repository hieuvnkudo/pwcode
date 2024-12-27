import { systemPromptForCompletion } from "@/lib/prompts/completion";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash-exp", {
      useSearchGrounding: true,
    }),
    system: systemPromptForCompletion,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
