import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubmitsByStudentId } from "@/db/querys/submits";
import SPSubmit from "./sp-submit";

type Props = {
  studentId: string;
};
const SubmitCard = async ({ studentId }: Props) => {
  const submits = await getSubmitsByStudentId(studentId);
  return (
    <div className="flex flex-col gap-4">
      {submits.map((submit) => {
        const sub = submit.submit_table;
        const code = submit.code_table;
        const assign = submit.assignment_table;
        return (
          <Card key={sub.id} className="hover:shadow-md">
            <CardHeader>
              <CardTitle>{assign.name}</CardTitle>
              <CardDescription>{assign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="my-2">Nhận xét: {sub.feedback}</h4>
              <h4 className="mb-2">Điểm: {sub.point}</h4>
              <SPSubmit code={code} />
            </CardContent>
            <CardFooter>
              <p>{assign.updatedAt.toLocaleString()}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default SubmitCard;
