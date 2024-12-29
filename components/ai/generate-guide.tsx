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
  const { submit } = useObject({
    api: "/api/guide",
    schema: guideSchema,
    onFinish: ({ object }) => {
      console.log(object);
      localStorage.setItem(
        originalCode.id,
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
    const isHave = localStorage.getItem(originalCode.id);
    if (isHave) {
      const code = JSON.parse(isHave);
      updateCode(code);
      localStorage.removeItem(originalCode.id);
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
    <div className="flex items-center gap-2">
      <Button onClick={returnCode}>Trở lại</Button>
      <Button onClick={handleGenarate}>Chạy</Button>
    </div>
  );
}
