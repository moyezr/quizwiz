import Wrapper from "@/components/Wrapper";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { getPercentageCorrect, getTimeTaken } from "@/lib/helpers";
import HistoryItem from "@/components/HistoryItem";
type Props = {};

const getRecentGames = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Game: {
        include: {
          questions: true,
        },
      },
    },
  });

  return user?.Game;
};

export const metadata = {
  title: "Dashboard | QuizWiz",
};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();

  const games = await getRecentGames(session!.user.id);

  // console.log("GAMES", games);

  return (
    <main className="w-full min-h-[60vh] flex flex-col gap-8">
      <Link href="/quiz">
        <Card className="hover:shadow-md transition cursor-pointer">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Play Quiz
            </CardTitle>
            <CardDescription className="sm:text-lg md:text-xl lg:text-xl">
              Choose a Topic and Get Started!
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <Card className="hover:shadow-md transition pb-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Recent Quiz
          </CardTitle>
          <CardDescription className="sm:text-lg md:text-xl lg:text-xl">
            Your Quiz History
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col-reverse gap-4 px-6 items-center justify-center">
          {games && games?.length > 0 ? (
            games?.map((item, i) => <HistoryItem item={item} key={i} />)
          ) : (
            <p className="text-gray-600 text-center text-lg sm:text-xl md:text-2xl pt-4 pb-8">
              You haven&apos;t played any quizzes yet.
            </p>
          )}
        </div>
      </Card>
    </main>
  );
};

export default DashboardPage;
