"use client";

import {signIn} from "next-auth/react"
import { Button } from "./ui/button";

type Props = {}

const SignInButton = (props: Props) => {
  return (
    <Button  className="text-3xl px-8 py-8 font-semibold dark:text-gray-700 rounded-full" onClick={async () => {
      await signIn("google")
    }} variant="default" >
    Play
    </Button>
  )
}

export default SignInButton