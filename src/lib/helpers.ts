import { JsonValue } from "@prisma/client/runtime/library";

type PercentageCheckQuestion = {
  id: string;
  question: string;
  answer: string;
  gameId: string;
  options: JsonValue;
  isCorrect: boolean | null;
  userAnswer: string | null;
};
export function getPercentageCorrect(questions: PercentageCheckQuestion[]) {
  let numberOfQuestions = questions.length;

  let correctAnswers: number = 0;

  for (let i = 0; i < numberOfQuestions; i++) {
    if (questions[i].isCorrect) {
      ++correctAnswers;
    }
  }

  let percentageCorrect = Math.floor(
    (correctAnswers / numberOfQuestions) * 100
  );

  return percentageCorrect;
}

export function getTimeTaken(endTime: Date, startTime: Date) {
  let endDate = new Date(endTime);
  let startDate = new Date(startTime);

  let endMilli = endDate.getTime();

  let startMilli = startDate.getTime();

  let differenceInMilliseconds = endMilli - startMilli;


  let displayMessage: string = ``;

  if (differenceInMilliseconds > 0) {
    let differenceInHours = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60)
    );

    if (differenceInHours > 0) {
      displayMessage = differenceInHours + "h ";
    }

    let differenceInMinutes =
      Math.floor(differenceInMilliseconds / (1000 * 60)) -
      differenceInHours * 60;

    if (differenceInMinutes > 0) {
      displayMessage += differenceInMinutes + "m ";
    }

    let differenceInSeconds =
      Math.floor(differenceInMilliseconds / 1000) -
      differenceInHours * 60 -
      differenceInMinutes * 60;

    displayMessage += differenceInSeconds + "s ";
  }

  return displayMessage;
}

export function getTrophyColorAndFeedback(percentageCorrect: number): {
  trophyColor: string;
  feedback: string;
} {
  let trophyColor: string;
  let feedback: string;

  if (percentageCorrect <= 25) {
    trophyColor = "tomato";
    feedback = "Time to hit the books, Dumbbass!";
  } else if (percentageCorrect > 25 && percentageCorrect <= 60) {
    trophyColor = "sienna";
    feedback = "Not Bad!";
  } else if (percentageCorrect > 60 && percentageCorrect < 100) {
    trophyColor = "silver";
    feedback = "You're Getting There.";
  } else {
    trophyColor = "gold";
    feedback = "Proud of ya Son.";
  }

  return {
    trophyColor,
    feedback,
  };
}
