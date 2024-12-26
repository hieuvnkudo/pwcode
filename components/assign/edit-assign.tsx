"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { updateAssignByIdAction } from "@/lib/action/assign";
import { AssignmentSelect } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "../tiptap/rich-text-editor";
import { Input } from "../ui/input";

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  name: z
    .string()
    .nonempty("Không được để trống")
    .max(256, { message: "Nhiều nhất 256 kí tự" }),
  content: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "Nội dung bài tập không được để trống",
    }
  ),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  assign: AssignmentSelect;
};

const EditAssign = ({ assign }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: assign.description || "",
      name: assign.name || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    setIsLoading(true);
    const { error } = await updateAssignByIdAction(assign.id, {
      description: values.content,
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã cập nhật bài tập",
      });
      router.refresh();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên bài tập</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bài 1: HTML" />
              </FormControl>
              <FormDescription>Chỉnh sửa tên bài tập ở đây</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung bài tập</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Viết nội dung bài tập ở đây</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? "Đang lưu" : "Lưu"}</Button>
      </form>
    </Form>
  );
};

export default EditAssign;
