import { google } from "@ai-sdk/google";
import { mistral } from "@ai-sdk/mistral";
import { xai } from "@ai-sdk/xai";

export const mistralModel = mistral("mistral-large-latest");
export const geminiModel = google("gemini-2.0-flash-exp");
export const xaiModel = xai("grok-2-1212");
