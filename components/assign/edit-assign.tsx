"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { updateAssignByIdAction } from "@/lib/action/assign";
import { AssignmentSelect } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "../tiptap/rich-text-editor";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  dueDate: z.date({
    required_error: "Bắt buộc phải có ngày hết hạn",
  }),
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
      dueDate: assign.dueDate || new Date(),
      content: assign.description || "",
      name: assign.name || "",
    },
  });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("dueDate", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("dueDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue("dueDate", newDate);
  }

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    setIsLoading(true);
    const { error } = await updateAssignByIdAction(assign.id, {
      name: values.name,
      dueDate: values.dueDate,
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
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Chọn thời gian đến hạn bài tập (24h)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MM/dd/yyyy HH:mm")
                      ) : (
                        <span>Thời gian đến hạn</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  field.value && field.value.getHours() === hour
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("hour", hour.toString())
                                }
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  field.value &&
                                  field.value.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("minute", minute.toString())
                                }
                              >
                                {minute.toString().padStart(2, "0")}
                              </Button>
                            )
                          )}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Chọn thời gian có thể nộp bài tập
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
