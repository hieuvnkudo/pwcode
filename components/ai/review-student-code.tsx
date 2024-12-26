"use client";
import { userPromptForReviewCode } from "@/lib/prompts/review-code";
import { CodeSelect } from "@/lib/types";
import { useCompletion } from "ai/react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

type Props = {
  studentCode: CodeSelect;
  originalCode: CodeSelect;
};

const ReviewStudentCode = ({ studentCode, originalCode }: Props) => {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="my-2">
      <Button
        onClick={async () => {
          await complete(userPromptForReviewCode(studentCode, originalCode));
        }}
      >
        Review Code
      </Button>
      <div className="">
        <Markdown>{completion}</Markdown>
      </div>
    </div>
  );
};

export default ReviewStudentCode;
