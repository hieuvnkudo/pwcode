import { signOut } from "@/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="icon-wrapper">
          <LogOutIcon />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đăng xuấtxuất?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn sẽ phải đăng nhập lại để tiếp tục
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              "use server";
              await signOut();
            }}
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
