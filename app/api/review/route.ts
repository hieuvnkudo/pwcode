import { mistralModel } from "@/lib/ai/models";
import { reviewSchema } from "@/lib/schemas/review-code";
import { streamObject } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: mistralModel,
    schema: reviewSchema,
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return result.toTextStreamResponse();
}
