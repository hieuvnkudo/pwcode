import { auth } from "@/auth";
import CustomAvatar from "../custom/custom-avatar";
import BackButton from "./back-button";
import GoogleButton from "./google-button";
import LogoutButton from "./logout-button";
import TitlePath from "./title-path";

const TopBar = async () => {
  const session = await auth();
  return (
    <header className="flex items-center justify-between h-16 px-4 py-2">
      <BackButton />
      <TitlePath />
      {session ? (
        <>
          <div className="hidden md:block">
            <CustomAvatar
              name={session.user?.name as string}
              src={session.user?.image as string}
              type="name-left"
            />
          </div>
          <div className="md:hidden">
            <LogoutButton />
          </div>
        </>
      ) : (
        <GoogleButton />
      )}
    </header>
  );
};

export default TopBar;
