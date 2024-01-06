"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      className="border border-gray-400 text-3xl bg-gradient-to-br from-transparent to-gray-300/20 backdrop-blur-xl px-8 rounded-full py-2 dark:text-gray-200 text-gray-700 tracking-wide hover:shadow-gray-500 hover:shadow-md transition "
      onClick={async () => {
        await signIn("google");
      }}
      variant="default"
    >
      Play
    </Button>
  );
};

export default SignInButton;
