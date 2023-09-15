"use client";
import { z } from "zod";
import { quizCreationSchema } from "@/schemas/quizSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

type openAiResponse = {
  question: string,
  answer: string,
  options: string[]
};

type Props = {};

const QuizCreationForm = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(true);

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
      const {data: { questions }}= await axios.post(
        "/api/questions/create",
        {
          topic,
          questionNumber,
        }
      );

      const gameCreationResponse = await axios.post("/api/game", {
        topic,
        questionNumber,
      });

      const { gameId } = gameCreationResponse.data;



      let formattedQuestions = questions.map((item: openAiResponse) => {
        return {
          question: item.question,
          answer: item.answer,
          options: JSON.stringify(item.options),
          gameId: gameId,
        };
      }) as Question[];


      // adding Questions to databse
      let questionAdditionResponse = await axios.post("/api/questions/add", {
        questions: formattedQuestions
      });


      router.push(`/play/${gameId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setFinished(true);
    }
  }

  if (!finished) {
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
