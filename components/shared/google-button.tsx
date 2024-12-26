"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  return (
    <div>
      <Button
        onClick={() => signIn("google")}
        variant={"outline"}
        className="hidden"
      >
        Đăng nhập với Google
      </Button>
      <Button
        onClick={() => signIn("google")}
        variant={"outline"}
        className="md:inline-flex"
      >
        <LogInIcon />
      </Button>
    </div>
  );
};

export default GoogleButton;
