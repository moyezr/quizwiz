"use client";

import {signIn} from "next-auth/react"
import { Button } from "./ui/button";

type Props = {}

const SignInButton = (props: Props) => {
  return (
    <Button  className="border-" onClick={async () => {
      await signIn("google")
    }} variant="default" >
    Play
    </Button>
  )
}

export default SignInButton