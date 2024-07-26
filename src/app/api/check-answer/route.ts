import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { questionId, userAnswer, isLast, gameId } = body;

    // console.log("Question Id", questionId);
    // console.log("User answer", userAnswer);

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });

    // If the answered question is the last question
    if (isLast) {
      // console.log("This is the last question")
      if (question?.answer === userAnswer) {
        // console.log("Last Question and Correct Answer")
        await Promise.all([
          await prisma.question.update({
            where: {
              id: questionId,
            },
            data: {
              isCorrect: true,
              userAnswer: userAnswer,
            },
          }),

          await prisma.game.update({
            where: {
              id: gameId,
            },
            data: {
              timeEnded: new Date(),
            },
          }),
        ]);

        return Response.json({ isCorrect: true }, { status: 200 });
      } else {
        await Promise.all([
          await prisma.question.update({
            where: {
              id: questionId,
            },
            data: {
              isCorrect: false,
              userAnswer: userAnswer,
            },
          }),

          await prisma.game.update({
            where: {
              id: gameId,
            },
            data: {
              timeEnded: new Date(),
            },
          }),
        ]);
      }

      return Response.json({ isCorrect: false }, { status: 200 });
    } else {
      if (question?.answer === userAnswer) {
        const updateResponse = await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            isCorrect: true,
            userAnswer: userAnswer,
          },
        });

        // console.log("Update", updateResponse);
        return Response.json({ isCorrect: true }, { status: 200 });
      } else {
        const updateResponse = await prisma.question.update({
          where: {
            id: questionId,
          },
          data: {
            isCorrect: false,
            userAnswer: userAnswer,
          },
        });

        // console.log("Update", updatResponse);

        return Response.json({ isCorrect: false }, { status: 200 });
      }
    }
  } catch (error) {
    console.log("ERROR CHECKING ANSWER", error);
    return Response.json({ message: "Error Checking Answer" }, { status: 400 });
  }
}
