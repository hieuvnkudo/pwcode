"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updateSubmitAction } from "@/lib/action/submit";
import { StudentSelect, SubmitSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  point: z.number().min(0).max(10),
  feedback: z.string().min(2).max(1000),
});

type Props = {
  submit: SubmitSelect;
  student: StudentSelect;
};

const ResultSubmit = ({ submit, student }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      point: 0,
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { error } = await updateSubmitAction(submit.id, {
      point: values.point,
      feedback: values.feedback,
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
        description: "Lưu kết quả thành công",
      });
      router.refresh();
    }
  }
  return (
    <div className="w-1/2 mx-auto">
      <h3>Chủ nhân: {student.name}</h3>
      <h4>Email: {student.userEmail}</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Điểm</FormLabel>
                <FormControl>
                  <Input placeholder="10" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Điểm của bài làm. Điểm từ 0 đến 10.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Điểm</FormLabel>
                <FormControl>
                  <Textarea placeholder="Good!!!!" {...field} />
                </FormControl>
                <FormDescription>Đánh giá của giáo viên.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Đang lưu" : "Lưu kết quả"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResultSubmit;
