"use client";
import { userPromptForCompletion } from "@/lib/prompts/completion";
import {} from "@/lib/prompts/review-code";
import { CodeSelect } from "@/lib/types";
import { useCompletion } from "ai/react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

type Props = {
  studentCode: CodeSelect;
  originalCode: CodeSelect;
};

const ReviewStudentCode = ({ studentCode, originalCode }: Props) => {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="my-2">
      <Button
        disabled={isLoading}
        onClick={async () => {
          await complete(userPromptForCompletion(studentCode, originalCode));
        }}
      >
        So sánh Code
      </Button>
      <div>
        <Markdown>{completion}</Markdown>
      </div>
    </div>
  );
};

export default ReviewStudentCode;
