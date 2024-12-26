"use client";
import { useCompletion } from "ai/react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";

import { fileNames } from "@/contants/sandpack";
import { reviewCodePrompt } from "@/lib/prompts/review-code";
import { useSandpack } from "@codesandbox/sandpack-react";

const ReviewProjectCode = () => {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const handleGenarate = async () => {
    await complete(
      reviewCodePrompt({
        html: files[fileNames.html].code,
        css: files[fileNames.css].code,
        javascript: files[fileNames.javascript].code,
      })
    );
  };
  return (
    <div className="my-2">
      <Button onClick={handleGenarate}>Review Code</Button>
      <div className="my-2">
        <Markdown>{completion}</Markdown>
      </div>
    </div>
  );
};

export default ReviewProjectCode;
