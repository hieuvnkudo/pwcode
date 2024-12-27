"use client";
import { useState } from "react";
import { Button } from "../ui/button";

import { fileNames } from "@/contants/sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";

const ReviewProjectCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;
  const update = (json: { html: string; css: string; javascript: string }) => {
    updateFile(fileNames.html, json.html);
    updateFile(fileNames.css, json.css);
    updateFile(fileNames.javascript, json.javascript);
  };
  const handleGenarate = async () => {
    setIsLoading(true);

    await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        html: files[fileNames.html].code,
        css: files[fileNames.css].code,
        javascript: files[fileNames.javascript].code,
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          setIsLoading(false);
          update(json);
        });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="my-2 flex gap-2">
      <Button onClick={handleGenarate}>
        {isLoading ? "Reviewing" : "Review"}
      </Button>
    </div>
  );
};

export default ReviewProjectCode;
