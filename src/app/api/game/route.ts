import { getAuthSession } from "@/lib/auth";
import { quizCreationSchema } from "@/schemas/quizSchema";
import { ZodError } from "zod";
import OpenAi from "openai";
import { apiResponseSchema } from "@/schemas/questionSchema";
import { prisma } from "@/lib/db";
import { shuffle } from "@/lib/utils";
import { Question } from "@prisma/client";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { questionNumber, topic } = quizCreationSchema.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const { id: userId } = session.user;
    if (topic.length < 3 || topic.length > 20) {
      return Response.json(
        {
          message: "Topic must be contain characters in the range  3 - 20",
        },
        {
          status: 401,
        }
      );
    }

    if (questionNumber < 3 || questionNumber > 10) {
      return Response.json(
        {
          message: "Number of Questions must be in the range of 3 - 20",
        },
        {
          status: 401,
        }
      );
    }

    const prompt = `You are a quiz master. 

        Generate ${questionNumber} multiple-choice type questions with randome hardness on topic ${topic} with one answer and three other options excluding the answer.
        
        Put the in a JSON list format as following:
        {
        "question": "<The question>",
        "answer": "<The  answer>",
        "options": ["<option1>", "<option2>", "<option3>"]
        }
        
        Only answer with the JSON list, nothing else.`;

    console.log("I ran");
    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      //   functions: [
      //     {
      //       name: "out",
      //       // here we define our function to get the result from the agent in JSON form
      //       description:
      //         "This is the function that returns the result of the agent",
      //       // we use zod and a zod-to-json-schema converter to define the JSON Schema very easily
      //       parameters: openAiSchema
      //             }
      //   ],
    });

    console.log("Response", completions.choices[0].message.content);

    let questions = completions.choices[0].message.content;

    questions = JSON.parse(questions as string);

    let parsedQuestions = apiResponseSchema.parse(questions);

    //creatiing the game to get the gameId
    const game = await prisma.game.create({
      data: {
        userId: userId as string,
        topic,
        timeStarted: new Date(),
      },
    });

    const gameId = game.id;

    let formattedQuestions = parsedQuestions.map((item) => {
      let options = [...item.options, item.answer];

      shuffle(options);

      return {
        question: item.question,
        answer: item.answer,
        options: JSON.stringify(options),
        gameId: gameId,
      };
    }) as Question[];

    let questionCreationResponse = await prisma.question.createMany({
      // @ts-ignore
      data: formattedQuestions,
    });

    console.log("Questions Created Response", questionCreationResponse);

    return Response.json({ message: "OK", gameId: game.id }, { status: 200 });
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
