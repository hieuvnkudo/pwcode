"use client";

import { fileNames } from "@/contants/sandpack";
import { guideSchema } from "@/lib/schemas/guide-schema";
import { CodeSelect } from "@/lib/types";
import { useSandpack } from "@codesandbox/sandpack-react";
import { experimental_useObject as useObject } from "ai/react";
import { Button } from "../ui/button";

type Props = {
  originalCode: CodeSelect;
};

export default function GenerateGuide({ originalCode }: Props) {
  const { submit, isLoading, stop } = useObject({
    api: "/api/guide",
    schema: guideSchema,
    onFinish: ({ object }) => {
      console.log(object);
      localStorage.setItem(
        "return-code",
        JSON.stringify({
          html: files[fileNames.html]?.code,
          css: files[fileNames.css]?.code,
          javascript: files[fileNames.javascript]?.code,
        })
      );
      updateCode({
        html: object?.html,
        css: object?.css,
        javascript: object?.javascript,
      });
    },
  });
  const updateCode = (code: {
    html?: string;
    css?: string;
    javascript?: string;
  }) => {
    updateFile(fileNames.html, code.html);
    updateFile(fileNames.css, code.css);
    updateFile(fileNames.javascript, code.javascript);
  };
  const returnCode = () => {
    const isHave = localStorage.getItem("return-code");
    if (isHave) {
      const code = JSON.parse(isHave);
      updateCode(code);
      localStorage.removeItem("return-code");
    }
  };
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;
  const handleGenarate = async () => {
    submit({
      html: originalCode.html,
      css: originalCode.css,
      js: originalCode.javascript,
    });
  };
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          returnCode();
        }}
      >
        Return
      </Button>
      <Button disabled={isLoading} onClick={handleGenarate} className="w-fit">
        {isLoading ? "Generating..." : "Generate"}
      </Button>
      {isLoading && <Button onClick={() => stop()}>Stop</Button>}
    </div>
  );
}
