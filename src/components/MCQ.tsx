"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Timer from "@/components/Timer";
import CorrectIncorrect from "./CorrectIncorrect";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import QuizCounter from "./QuizCounter";

type Props = {
  questions:
    | {
        id: string;
        question: string;
        options: Prisma.JsonValue;
      }[]
    | undefined;
  gameId: string;
};

let options = ["option1", "option2", "option3", "answer"];

const MCQ = ({ questions, gameId }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const router = useRouter();

  const { toast } = useToast();

  if (typeof questions === "undefined") {
    return (
      <main>
        <p className="pt-8 font-bold text-red-400 text-6xl">
          Failed to Get Game Details
        </p>
      </main>
    );
  }

  let options = questions[questionIndex].options;

  options = JSON.parse(options as string) as string[];

  const selectOption = (index: number) => {
    setSelectedIndex(index);
  };

  async function handleNext() {
    try {
      const response = await axios.post("/api/check-answer", {
        questionId: questions![questionIndex].id,
        // @ts-ignore
        userAnswer: options[selectedIndex] as string,

        isLast: questionIndex === questions!.length - 1,
        gameId: gameId,
      });

      if (response.data.isCorrect) {
        toast({
          title: "Correct!",
          description: "Your Answer was right.",
          variant: "success",
        });

        setCorrectAnswers((prev) => prev + 1);
      } else {
        toast({
          title: "Incorrect!",
          description: "Your Answer was wrong.",
          variant: "destructive",
        });

        setWrongAnswers((prev) => prev + 1);
      }

      if (questionIndex === questions!.length! - 1) {
        return router.push(`/statistics/${gameId}`);
      }

      setQuestionIndex((prev) => prev + 1);
      setSelectedIndex(-1);
    } catch (error) {
      console.log("CLIENT ERROR CHECKING ANSWER", error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <QuizCounter
          totalQuestions={questions.length}
          currentIndex={questionIndex}
        />
        <CorrectIncorrect
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
      </div>

      <Card className="text-bold px-4 py-2">
        <h3 className="font-bold">{questions[questionIndex].question}</h3>
      </Card>
      {options.map((option, i) => {
        return (
          <Button
            key={i}
            onClick={() => selectOption(i)}
            type="button"
            className={cn(`text-left px-4 py-2 cursor-pointer`)}
            variant={selectedIndex === i ? "default" : "outline"}
          >
            {option as string}
          </Button>
        );
      })}

      <Button type="button" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default MCQ;
