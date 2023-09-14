import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PlayPageLayout = async ({ children }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
  
    <Wrapper>
      <Header session={session} />
    <main className="pt-12 h-full w-full flex flex-col gap-8 justify-center items-center">
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">{children}</div>
    </main>
    </Wrapper>
  );
};

export default PlayPageLayout;
