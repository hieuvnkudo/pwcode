import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "@/lib/types";
import { createFiles } from "@/lib/utils";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import { ecoLight } from "@codesandbox/sandpack-themes";

type Props = {
  children: React.ReactNode;
  code: Pick<CodeSelect, "html" | "css" | "javascript">;
  reviewCode?: React.ReactNode;
};

const SPEditor = ({ children, code, reviewCode }: Props) => {
  const files = createFiles(code);
  return (
    <SandpackProvider
      files={files}
      theme={ecoLight}
      template="static"
      customSetup={{
        entry: fileNames.html,
      }}
      options={{
        visibleFiles: [fileNames.html, fileNames.css, fileNames.javascript],
        activeFile: fileNames.html,
      }}
    >
      {children}
      <SandpackStack>
        <SandpackLayout>
          <SandpackCodeEditor
            showTabs={true}
            style={{
              height: "calc(100vh - 8rem)",
            }}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            style={{
              height: "calc(100vh - 8rem)",
            }}
          />
        </SandpackLayout>
      </SandpackStack>
      {reviewCode}
    </SandpackProvider>
  );
};

export default SPEditor;
