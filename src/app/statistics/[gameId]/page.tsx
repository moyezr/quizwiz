import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import React from "react";
import { ArrowBigLeft, Check, Hourglass, Trophy, X } from "lucide-react";
import {
  getPercentageCorrect,
  getTimeTaken,
  getTrophyColorAndFeedback,
} from "@/lib/helpers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type Props = {
  params: {
    gameId: string;
  };
};

const getGameDetails = async (gameId: string) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: true,
    },
  });

  return game;
};


export const metadata = {
  title: "Statistics | QuizWiz"
}

const StatisticsPage = async ({ params: { gameId } }: Props) => {
  const game = await getGameDetails(gameId);

  const questions = game?.questions;

  let percentageCorrect = getPercentageCorrect(questions!);

  const { trophyColor, feedback } =
    getTrophyColorAndFeedback(percentageCorrect);

  const timeTaken = getTimeTaken(game!.timeEnded!, game!.timeStarted);

  return (
    <main className="pt-8 w-full flex flex-col gap-4 justify-center items-center">
      <div className="flex gap-4 items-center w-full self-start">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowBigLeft />
            Back to Dashboard
          </Button>
        </Link>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <p className="flex flex-wrap items-center justify-center gap-2">
                <Hourglass className="hover:rotate-180 transition-transform duration-300" />{" "}
                {timeTaken}
              </p>
            </TooltipTrigger>
            <TooltipContent>
            <p>Time taken to complete the Quiz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-center mx-auto">
            <Trophy color={trophyColor} size={100} />
          </CardTitle>
          <CardDescription>
            You got {percentageCorrect}% of Questions correct.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          {feedback}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>
            Here&apos;s how you performed in the last quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {questions?.map((item, i) => (
              <>
                <Card className="">
                  <CardHeader className="py-2">
                    <CardDescription className="text-xs sm:text-sm">
                      Question
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="font-semibold text-sm sm:text-base">
                    {item.question}
                  </CardContent>
                </Card>
                <Card>
                  {item.userAnswer !== item.answer ? (
                    <>
                      <CardHeader className="py-2">
                        <CardDescription className="flex gap-1 items-center text-xs sm:text-sm">
                          Your Answer{" "}
                          <span className="rounded-full p-0 bg-red-500 text-white">
                            <X className="rounded-full" size={14} />
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-red-500 text-sm sm:text-base">
                        {item.userAnswer}
                      </CardContent>
                      <CardHeader className="py-2">
                        <CardDescription className="text-xs sm:text-sm">
                          {" "}
                          Answer
                        </CardDescription>{" "}
                      </CardHeader>
                      <CardContent className="text-green-500 text-sm sm:text-base">
                        {item.answer}
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardHeader className="py-2">
                        <CardDescription className="text-xs sm:text-sm flex items-center gap-1">
                          Your Answer{" "}
                          <span className="rounded-full p-0 bg-green-500 text-white">
                            <Check
                              color="white"
                              className="bg-green-500 rounded-full"
                              size={14}
                            />
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-green-500 text-sm sm:text-base">
                        {item.userAnswer}
                      </CardContent>
                    </>
                  )}
                </Card>
              </>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default StatisticsPage;
