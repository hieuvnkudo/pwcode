import { auth } from "@/auth";
import { TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { classTable, studentTable } from "@/db/schema";
import { formatName, formatTime } from "@/lib/utils";
import { and, desc, eq } from "drizzle-orm";
import CustomTable, { CustomTableCell } from "../custom/custom-table";
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
  const tableHeadNames = [
    {
      name: "Tên",
      show: true,
    },
    {
      name: "Tham gia lúc",
      show: true,
    },
    {
      name: "Bài tập đã làm",
      show: isTeacher,
    },
  ];
  return (
    <CustomTable tableHeadNames={tableHeadNames} caption="Danh sách học sinh">
      {students.map((student) => {
        return (
          <TableRow key={student.id}>
            <CustomTableCell>{formatName(student.name, 20)}</CustomTableCell>
            <CustomTableCell>{formatTime(student.createdAt)}</CustomTableCell>
            {isTeacher && (
              <CustomTableCell>
                <AssignButtonWithStudent
                  student={student}
                  classroom={classroom[0]}
                />
              </CustomTableCell>
            )}
          </TableRow>
        );
      })}
    </CustomTable>
  );
};

export default StudentTable;
