"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { recodeProjectAction } from "@/lib/action/project";
import { CodeErrorToMessage, CodeSelect, ProjectSelect } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

type Props = {
  code: CodeSelect;
  project: ProjectSelect;
  isRecode: boolean;
};

const ReCodeButton = ({ code, project, isRecode }: Props) => {
  const router = useRouter();
  const handleRecode = async () => {
    const { error, data } = await recodeProjectAction(code);
    if (error) {
      toast({
        title: "Lỗi",
        description: CodeErrorToMessage[error] || "Đã có lỗi xảy ra",
      });
    } else if (data) {
      toast({
        title: "Thành công",
        description: "Recode thành công",
        action: (
          <ToastAction
            onClick={() => router.push(`/projects/${data[0].id}`)}
            altText="Go to Project"
          >
            Tiếp tục
          </ToastAction>
        ),
      });
    } else {
      console.log("error");
    }
  };
  return (
    <>
      {isRecode ? (
        <Dialog>
          <Button asChild>
            <DialogTrigger>Viết lại</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Viết lại dự án</DialogTitle>
              <DialogDescription>
                Mô tả dự án: {project.description}
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleRecode}>Xác nhận viết lại</Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Button asChild variant={"outline"}>
          <Link href={`/projects/${project.id}`}>Viết mã</Link>
        </Button>
      )}
    </>
  );
};

export default ReCodeButton;
