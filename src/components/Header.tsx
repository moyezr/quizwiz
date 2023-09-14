"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, Wand2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkModeToggle from "./DarkModeToggle";
import { signIn, signOut } from "next-auth/react";
import blankProfile from "../../public/blank-profile.png";
import Image from "next/image";
type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  let imageUrl: string = "";

  if (session?.user?.image) {
    imageUrl = session.user.image;
  }

  return (
    <div className="w-full flex justify-between py-8">
      <Link
        href="/"
        className="flex items-center font-bold text-base sm:text-lg md:text-xl lg:text-2xl gap-2"
      >
        <Wand2 color="deepskyblue" /> QuizWiz
      </Link>

      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback >
                <Image
                  alt="fallback image"
                  src={blankProfile}
                  height={40}
                  width={40}
                />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

        {session?.user ? (
    <DropdownMenuContent className="cursor-pointer">
            <Link href="/quiz">
              <DropdownMenuItem className="mb-2 px-4 py-2">
                <LayoutDashboard className="mr-2" />
                <Link className="text-base" href="/dashboard">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="text-base px-4 py-2"
              onClick={async () => await signOut()}
            >
              <LogOut className="mr-2 " />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
    <DropdownMenuContent className="cursor-pointer">
            
              <DropdownMenuItem onClick={async () => await signIn("google")} className="px-4">
                  <LogIn className="mr-2" />
                <DropdownMenuLabel className="text-base">
                  Sign In
                </DropdownMenuLabel>
              </DropdownMenuItem>
      
          </DropdownMenuContent>
          
        )}
      
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
