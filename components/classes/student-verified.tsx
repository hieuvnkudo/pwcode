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
import { studentTable } from "@/db/schema";
import { formatTime } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import DeleteStudent from "../student/delete-student";
import VerifiedStudentButton from "../student/verified-student-button";
import VerifiedStudentOnClass from "../student/verified-students-on-class";

type Props = {
  classId: string;
};

const StudentVerified = async ({ classId }: Props) => {
  const students = await db
    .select()
    .from(studentTable)
    .where(
      and(eq(studentTable.classId, classId), eq(studentTable.verified, false))
    );
  return (
    <div>
      <h1 className="my-4 text-xl font-bold text-center">
        DANH SÁCH HỌC SINH CHỜ DUYỆT
      </h1>
      <div className="flex items-center justify-end">
        <VerifiedStudentOnClass
          classId={classId}
          studentCount={students.length}
        />
      </div>
      <Table className="mt-2">
        <TableCaption>
          Danh sách học sinh trong lớp (Số lượng: {students.length})
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Tham gia lúc</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{formatTime(student.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DeleteStudent studentId={student.id} />
                    <VerifiedStudentButton studentId={student.id} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentVerified;
