import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

const Loading = () => {
  return (
    <main className="w-full flex flex-col gap-8">
      <Link href="/quiz">
        <Card className="hover:shadow-md transition cursor-pointer">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <Skeleton className="w-[100px] h-[40px]" /> 
            </CardTitle>
            <CardDescription className="sm:text-lg md:text-xl lg:text-xl">
              <Skeleton className="w-full h-[20px]" />
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <Card className="hover:shadow-md transition">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-[60px] w-[150px]" />
          </CardTitle>
          <CardDescription className="sm:text-lg md:text-xl lg:text-xl">
            <Skeleton className="w-full h-[20px]" />
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-4 px-6 items-center justify-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center text-base sm:text-lg md:text-xl lg:text-2xl">
                <Skeleton className="w-[100px] h-[40px]" />
              </CardTitle>
            </CardHeader>

            <CardContent className="flex w-full justify-between text-xs sm:text-sm md:text-base">
              <Skeleton className="w-[100px] h-[20px]" />
              <Skeleton className="w-[100px] h-[20px]" />
              <Skeleton className="w-[100px] h-[20px]" />
            </CardContent>
          </Card>
        </div>
      </Card>
    </main>
  );
};

export default Loading;
