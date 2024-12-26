"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { guideSchema } from "@/lib/schemas/guide-schema";
import { CodeSelect } from "@/lib/types";
import { experimental_useObject as useObject } from "ai/react";
import { Button } from "../ui/button";

type Props = {
  originalCode: CodeSelect;
};

export default function GenerateGuide({ originalCode }: Props) {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/guide",
    schema: guideSchema,
  });
  const handleGenarate = async () => {
    submit({
      html: originalCode.html,
      css: originalCode.css,
      js: originalCode.javascript,
    });
  };
  return (
    <Dialog>
      <Button asChild>
        <DialogTrigger>Ai Guide</DialogTrigger>
      </Button>
      <DialogContent className="h-[calc(100vh-8rem)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex gap-2">
            <Button
              disabled={isLoading}
              onClick={handleGenarate}
              className="w-fit"
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
            {isLoading && <Button onClick={() => stop()}>Stop</Button>}
          </div>
        </DialogHeader>
        <div className="w-full text-sm">
          <h1>{object?.title}</h1>
          <h1>{object?.description}</h1>
          {object?.guides?.map((guide, index) => {
            return (
              <div key={index} className="text-sm text-gray-500 p-2 my-2">
                <p>{guide?.order}</p>
                <p>{guide?.currentFile}</p>
                <p>{guide?.requỉrement}</p>
                <p>{guide?.description}</p>
                <pre>{guide?.code}</pre>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
