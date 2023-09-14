import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const StatisticsLoading = (props: Props) => {
  return (
    <main className="pt-8 w-full flex flex-col gap-4 justify-center items-center">
      <Skeleton className="w-full h-[100px]" />

      <Card className="w-full">
        <Skeleton className="w-[60px] h-[40px] my-4" />
        <Skeleton className="w-[30px] h-[20px] mb-4" />
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="py-2">
                  <CardDescription>
                    <Skeleton className="w-[80%] h-[15px]" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-[40px]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default StatisticsLoading;
