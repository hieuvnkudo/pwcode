"use client";

import { PathContext } from "@/context/path-context";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const CurrentPathLocal = () => {
  const { path, setPath } = useContext(PathContext);
  const session = useSession();
  const user = session.data?.user;
  const pathname = usePathname();
  return null;
};

export default CurrentPathLocal;
