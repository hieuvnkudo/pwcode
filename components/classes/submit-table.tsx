import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { studentTable, submitTable } from "@/db/schema";
import { SubmitSelect } from "@/lib/types";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

type Props = {
  assignId?: SubmitSelect["assignId"];
  studentId?: SubmitSelect["studentId"];
};

const SubmitTable = async ({ assignId }: Props) => {
  const submits = await db
    .select()
    .from(submitTable)
    .innerJoin(studentTable, eq(submitTable.studentId, studentTable.id))
    .where(eq(submitTable.assignId, assignId as string))
    .orderBy(desc(submitTable.createdAt));
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Thời gian nộp</TableHead>
          <TableHead>Phản hồi</TableHead>
          <TableHead>Tên học sinh</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submits.map((submit) => {
          return (
            <TableRow key={submit.submit_table.id}>
              <TableCell>
                <Link
                  href={`/submit/${submit.submit_table.id}`}
                  className="hover:underline"
                >
                  {submit.submit_table.createdAt.toLocaleString()}
                </Link>
              </TableCell>
              <TableCell>{submit.submit_table.feedback}</TableCell>
              <TableCell>{submit.student_table.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SubmitTable;
