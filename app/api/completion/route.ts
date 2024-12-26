import { mistralModel } from "@/lib/ai/models";
import { systemPromptForReviewCode } from "@/lib/prompts/review-code";
import { streamText } from "ai";

export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: mistralModel,
    system: systemPromptForReviewCode,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
