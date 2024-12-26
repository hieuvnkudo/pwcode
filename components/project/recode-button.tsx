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
import { CodeSelect, ProjectSelect } from "@/lib/types";
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
        description: error,
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
            <DialogTrigger>Recode</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mô tả dự án nhanh?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleRecode}>Xác nhận recode</Button>
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
