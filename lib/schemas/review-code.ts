import { z } from "zod";

// define a schema for the notifications
export const reviewSchema = z.object({
  title: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis or links."),
    })
  ),
});
