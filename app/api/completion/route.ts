import { mistralModel } from "@/lib/ai/models";
import { systemPromptForReviewCode } from "@/lib/prompts/review-code";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: mistralModel,
    system: systemPromptForReviewCode,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
