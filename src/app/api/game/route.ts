import { getAuthSession } from "@/lib/auth";
import { quizCreationSchema } from "@/schemas/quizSchema";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
// import { shuffle } from "@/lib/utils";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { questionNumber, topic } = quizCreationSchema.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const userId = session.user.id;

    const gameCreationResponse = await prisma.game.create({
      data: {
        userId: userId as string,
        topic,
        timeStarted: new Date(),
      },
    });

    const gameId = gameCreationResponse.id;

    return Response.json({ message: "OK", gameId: gameId }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return Response.json({ message: error.issues, error }, { status: 403 });
    }

    return Response.json(
      { message: "Internal Server Error", error },
      {
        status: 500,
      }
    );
  }
}
