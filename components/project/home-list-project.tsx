import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { desc, eq } from "drizzle-orm";
import SPCommon from "../sandpack/sp-common";
import ReCodeButton from "./recode-button";

const HomeListProject = async () => {
  const publicProjects = await db
    .select()
    .from(projectTable)
    .innerJoin(codeTable, eq(codeTable.id, projectTable.codeId))
    .where(eq(projectTable.shared, true))
    .orderBy(desc(projectTable.updatedAt));
  const session = await auth();
  const email = session?.user?.email as string;
  return (
    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
      {publicProjects.map((project) => {
        const code = project.code_table;
        const pro = project.project_table;
        return (
          <Card key={pro.id}>
            <CardHeader>
              <CardTitle className="text-2xl">{pro.name}</CardTitle>
              <CardDescription>{pro.sharedContent}</CardDescription>
            </CardHeader>
            <CardContent>
              <SPCommon code={code}>
                <SandpackLayout>
                  <SandpackPreview showOpenInCodeSandbox={false} />
                </SandpackLayout>
              </SPCommon>
            </CardContent>
            <CardFooter>
              {session && (
                <ReCodeButton
                  code={code}
                  project={pro}
                  isRecode={pro.userEmail !== email}
                />
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default HomeListProject;
