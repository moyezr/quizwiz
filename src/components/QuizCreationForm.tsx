"use client";
import { z, ZodError } from "zod";
import { quizCreationSchema } from "@/schemas/quizSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoadingQuestions from "./LoadingQuestions";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { promptGenerator } from "@/lib/utils";
import { apiResponseSchema } from "@/schemas/questionSchema";
import { useToast } from "./ui/use-toast";

type openAiResponse = {
  question: string;
  answer: string;
  options: string[];
};

type Props = {};

const QuizCreationForm = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(true);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof quizCreationSchema>>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "Javascript",
      questionNumber: 5,
    },
  });

  async function onSubmit({
    topic,
    questionNumber,
  }: z.infer<typeof quizCreationSchema>) {
    setIsLoading(true);
    setFinished(false);
    try {
      // use this when generating questions using serverless api
      // const {data: { questions }}= await axios.post(
      //   "/api/questions/create",
      //   {
      //     topic,
      //     questionNumber,
      //   }
      // );
      const prompt = promptGenerator(topic, questionNumber); // Generates the prompt by prompt engineering for generating questions

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // directly using the rest api from openai due to limited timeout capacity of nextjs serverless functions
        {
          model: "gpt-3.5-turbo", // model of chatgpt.
          messages: [{ role: "user", content: prompt }],
          response_format: {
            type: "json_object",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
        }
      );

      // console.log("RESPONSE FROM OPEN AI", response.data);

      
      let questions = JSON.parse(response.data.choices[0].message.content);
      
      // console.log("GENERATAED QUESTIONS", questions) // testing purpose -> logging out the response generated from openai

      let parsedQuestions = apiResponseSchema.parse(questions); // parsing with zod to see if there are any type errors
      // console.log("parsed questions", parsedQuestions)

      const gameCreationResponse = await axios.post("/api/game", {
        // creating the game to get the gameId
        topic,
        questionNumber,
      });

      const { gameId } = gameCreationResponse.data; // getting the gameId

      let formattedQuestions = parsedQuestions.questions.map((item: openAiResponse) => {
        // formatting the questions to post it into the database
        return {
          question: item.question,
          answer: item.answer,
          options: JSON.stringify(item.options),
          gameId: gameId, // relating it with the game
        };
      }) as Question[];

      // adding Questions to database
      let questionAdditionResponse = await axios.post("/api/questions/add", {
        // adding questions to the database
        questions: formattedQuestions,
      });

      router.push(`/play/${gameId}`); // pushing to the play page
    } catch (error) {
      toast({
        title: "Error Generating Questions",
        description: "Couldn't generate quesitons",
        variant: "destructive",
      });
      console.log("Some error in generating questions", error);
      if(error instanceof ZodError) {
        console.log(error.message)
      }
    } finally {
      setIsLoading(false);
      setFinished(true);
    }
  }

  if (!finished || isLoading) {
    return <LoadingQuestions finished={finished} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Javascript" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="questionNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl>
                <Input
                  placeholder="5"
                  type="number"
                  min={3}
                  max={10}
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default QuizCreationForm;
