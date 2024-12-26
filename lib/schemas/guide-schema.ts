import { z } from "zod";

// define a schema for the notifications
export const guideSchema = z.object({
  title: z.string().describe("Mục tiêu của hướng dẫn viết lại dự án này"),
  description: z.string().describe("Mô tả dự án"),
  guides: z.array(
    z.object({
      order: z.number().describe("Thứ tự của bước hướng dẫn"),
      currentFile: z.string().describe("File hiện tại đang hướng dẫn"),
      requỉrement: z.string().describe("Yêu cầu cần đạt của bước này"),
      description: z
        .string()
        .describe(
          "Mô tả bước hướng dẫn.Mang tính chất hướng dẫn cho người đọc"
        ),
      code: z.string().describe("Code mẫu của bước hướng dẫn"),
    })
  ),
});
