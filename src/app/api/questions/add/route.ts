import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Question } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { questions } = body;

    let questionCreationResponse = await prisma.question.createMany({
      // @ts-ignore
      data: questions as Question[],
    });
    console.log("Questions Created Response", questionCreationResponse);
    return Response.json("OK", { status: 200 });
  } catch (error) {
    console.log("ERROR ADDING QUESTIONS", error);

    return Response.json("ERROR ADDING QUESTIONS", { status: 404 })
  }
}
