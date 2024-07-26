import { getAuthSession } from "@/lib/auth";
import { apiResponseSchema } from "@/schemas/questionSchema";
import { quizCreationSchema } from "@/schemas/quizSchema";
import OpenAI from "openai";
import { ZodError } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { questionNumber, topic } = quizCreationSchema.parse(body);

    if (topic.length < 3 || topic.length > 20) {
      return Response.json(
        "Topic must be contain characters in the range  3 - 20",
        { status: 401 }
      );
    }

    if (questionNumber < 3 || questionNumber > 10) {
      return Response.json(
        "Number of Questions must be in the range of 3 - 20",
        { status: 401 }
      );
    }

    // create the prompt
    const prompt = `You are a quiz master. 

        Generate ${questionNumber} multiple-choice type questions with randome hardness on topic ${topic} with one answer and four other options.
        
        Put the in a JSON list format as following:
        {
        "question": "<The question>",
        "answer": "<The exact answer. Don't write 'Option Number' here! >",
        "options": ["<option1>", "<option2>", "<option3>", "<option4>"]
        }
        
        Only answer with the JSON array, nothing else.`;

    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("OPEN AI RESPONSE", completions.choices[0].message.content)

    let questions = completions.choices[0].message.content;
    questions = JSON.parse(questions as string);
    let parsedQuestions = apiResponseSchema.parse(questions);

    return Response.json({ questions: parsedQuestions }, { status: 200 });
  } catch (error) {
    console.log("ERROR GENERATING QUESTIONS", error);
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
