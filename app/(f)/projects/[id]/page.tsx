import { auth } from "@/auth";
import GenerateGuide from "@/components/ai/generate-guide";
import ReviewProjectCode from "@/components/ai/review-project-code";
import SaveRemote from "@/components/sandpack/save-remote";
import SPEditor from "@/components/sandpack/sp-editor";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { CodeSelect } from "@/lib/types";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const session = await auth();
  if (!session) return redirect("/projects");
  const projects = await db
    .select()
    .from(projectTable)
    .innerJoin(codeTable, eq(projectTable.codeId, codeTable.id))
    .where(eq(projectTable.id, id));
  const projectWithOriginalCode = await db
    .select()
    .from(projectTable)
    .leftJoin(codeTable, eq(projectTable.originalCodeId, codeTable.id))
    .where(eq(projectTable.id, id));
  return (
    <div className="p-4">
      {projects?.map((project) => {
        const pro = project.project_table;
        const code = project.code_table;
        const originalCode = projectWithOriginalCode[0]?.code_table;
        const isRecode = originalCode ? true : false;
        return (
          <div key={pro.id}>
            <SPEditor
              code={code}
              topChildren={<ReviewProjectCode />}
              bottomchildren={
                isRecode && (
                  <div className="float-right mb-2">
                    <GenerateGuide originalCode={originalCode as CodeSelect} />
                  </div>
                )
              }
            >
              <SaveRemote codeId={code.id} />
            </SPEditor>
          </div>
        );
      })}
    </div>
  );
};

export default page;
