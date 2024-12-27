import { MonacoEditor } from "@/components/monaco/MonacoEditor";
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

const page = () => {
  return (
    <SandpackProvider template="static" theme="dark">
      <SandpackLayout>
        <MonacoEditor />
        <SandpackPreview style={{ height: "100vh" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default page;
