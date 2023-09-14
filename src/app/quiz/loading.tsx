import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const QuizCreationLoading = (props: Props) => {
  return (
    <main className="pt-8 flex flex-col gap-8 justify-center items-center">
      {/* <h1 className='tracking-tighter text-7xl font-bold'>
          Choose Your Topic
        </h1> */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
        <Card>
          <Skeleton className="w-full h-[30px]" />

          <Skeleton className="w-full h-[30px]" />

          <Skeleton className="w-full h-[40px]" />
        </Card>
      </div>
    </main>
  );
};

export default QuizCreationLoading;
