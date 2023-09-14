import MCQ from "@/components/MCQ";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios"
import { prisma } from "@/lib/db";

type Props = {
  params: { gameId: string };
};

export const metadata = {
  title: "Play | QuizWiz"
}
const getGame = async (gameId: string) => {
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
          },
        },
      },
    });

    return game;
  } catch (error) {
    console.log("Error FETCHING QUESTIONS", error)
  }
}

const PlayPage = async ({ params }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const game = await getGame(params.gameId);

  return (
        <MCQ questions={game?.questions} gameId={params.gameId} />
  );
};

export default PlayPage;
