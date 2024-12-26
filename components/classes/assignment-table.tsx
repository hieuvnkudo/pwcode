import { auth } from "@/auth";
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
import { assignmentTable, studentTable, submitTable } from "@/db/schema";
import { formatName, formatTime, isDueDate } from "@/lib/utils";
import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";

type Props = {
  classId: string;
  teacherEmail: string;
};

const AssignmentTable = async ({ classId, teacherEmail }: Props) => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const isTeacher = teacherEmail === email;
  if (isTeacher) {
    const ass = await db
      .select()
      .from(assignmentTable)
      .where(
        and(
          eq(assignmentTable.classId, classId)
          // gte(assignmentTable.dueDate, new Date())
        )
      )
      .orderBy(desc(assignmentTable.updatedAt));
    return (
      <Table>
        <TableCaption>Số lượng bài tập: {ass.length}</TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead>Tên bài tập</TableHead>
            <TableHead>Hạn nôp bài</TableHead>
            <TableHead>Thời gian cập nhật gần nhất</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ass.map((assignment, index) => {
            const ass = assignment;
            const isDue = isDueDate(ass.dueDate);
            return (
              <TableRow
                key={index}
                className={`${isDue ? "row-due" : "font-bold"}`}
              >
                <TableCell>
                  <Link href={`/assign/${ass.id}`} className="hover:underline">
                    {formatName(ass.name, 20)}
                  </Link>
                </TableCell>
                <TableCell>{isDue ? "Hết hạn" : "Còn hạn"}</TableCell>
                <TableCell>{formatTime(ass.updatedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
  const student = await db
    .select()
    .from(studentTable)
    .where(
      and(
        eq(studentTable.userEmail, email),
        eq(studentTable.classId, classId),
        eq(studentTable.verified, true)
      )
    );
  if (student.length === 0)
    return <h1>Bạn không phải là học sinh của lớp này</h1>;
  const assignments = await db
    .select()
    .from(assignmentTable)
    .where(eq(assignmentTable.classId, classId))
    .leftJoin(
      submitTable,
      and(
        eq(submitTable.assignId, assignmentTable.id),
        eq(submitTable.studentId, student[0].id)
      )
    )
    .orderBy(desc(assignmentTable.updatedAt));
  return (
    <Table>
      <TableCaption>
        Danh sách bài tập. Số lượng: {assignments.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tên bài tập</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Hạn nôp bài</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment, index) => {
          const ass = assignment.assignment_table;
          const submit = assignment.submit_table;
          const isDue = isDueDate(ass.dueDate);
          return (
            <TableRow
              key={index}
              className={`${isDue ? "row-due" : "font-bold"}`}
            >
              <TableCell>
                <Link href={`/assign/${ass.id}`} className="hover:underline">
                  {formatName(ass.name, 20)}
                </Link>
              </TableCell>
              <TableCell>{formatName(ass.description as string, 30)}</TableCell>
              <TableCell>{isDue ? "Hết hạn" : "Còn hạn"}</TableCell>
              <TableCell>{ass.createdAt.toLocaleString()}</TableCell>
              <TableCell
                className={
                  submit
                    ? "text-green-500"
                    : isDue
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {submit ? "Đã nộp" : "Chưa nộp"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AssignmentTable;
