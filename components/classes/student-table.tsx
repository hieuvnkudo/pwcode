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
import { classTable, studentTable } from "@/db/schema";
import { formatName, formatTime } from "@/lib/utils";
import { and, desc, eq } from "drizzle-orm";
import AssignButtonWithStudent from "../student/assign-button-with-student";

type Props = {
  classId: string;
};
const StudentTable = async ({ classId }: Props) => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const classroom = await db
    .select()
    .from(classTable)
    .where(eq(classTable.id, classId));
  if (classroom.length === 0) return <h1>Lớp học không tồn tại</h1>;
  const isTeacher = classroom[0].teacherEmail === email;
  const students = await db
    .select()
    .from(studentTable)
    .where(
      and(eq(studentTable.classId, classId), eq(studentTable.verified, true))
    )
    .orderBy(desc(studentTable.createdAt));
  return (
    <Table>
      <TableCaption>
        Danh sách học sinh. Số lượng: {students.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Tên</TableHead>
          <TableHead>Tham gia lúc</TableHead>
          {isTeacher && <TableHead>Bài tập đã làm</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => {
          return (
            <TableRow key={student.id}>
              <TableCell className="font-bold">
                {formatName(student.name, 20)}
              </TableCell>
              <TableCell>{formatTime(student.createdAt)}</TableCell>
              {isTeacher && (
                <TableCell>
                  <AssignButtonWithStudent
                    student={student}
                    classroom={classroom[0]}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
