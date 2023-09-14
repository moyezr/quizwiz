import { Prisma } from '@prisma/client';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { getPercentageCorrect, getTimeTaken, getTrophyColorAndFeedback } from '@/lib/helpers';
import { Hash, Hourglass, Trophy } from 'lucide-react';

type Props = {
    item: {
        questions: {
            id: string;
            question: string;
            answer: string;
            gameId: string;
            options: Prisma.JsonValue;
            isCorrect: boolean | null;
            userAnswer: string | null;
        }[];
    } & {
        id: string;
        userId: string;
        timeStarted: Date;
        topic: string;
        timeEnded: Date | null;
    }
}

const HistoryItem = ({item}: Props) => {

  const percentageCorrect = getPercentageCorrect(item.questions);

  const { trophyColor, feedback } = getTrophyColorAndFeedback(percentageCorrect);

  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex gap-4 items-center text-base sm:text-lg md:text-xl lg:text-2xl">
        {item.topic}{" "}
        <Link href={`/statistics/${item.id}`}>
          <Badge
            className="text-xs  sm:text-sm md:text-base"
            variant="default"
          >
            View Stats
          </Badge>
        </Link>
      </CardTitle>
      <CardDescription>
        {feedback}
      </CardDescription>
    </CardHeader>

    <CardContent className="flex w-full justify-between text-xs sm:text-sm md:text-base">

      
      <p className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2'><Hash />{item.questions.length} Questions</p>
      <p className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2'><Trophy color={trophyColor} /><span className='hidden sm:inline'>Score:</span> {getPercentageCorrect(item.questions)}</p>
      <p className='flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2'>
       <Hourglass className='hover:rotate-180 transition-transform duration-300' /> <span className='hidden sm:inline'>Time Taken:</span>{" "}
        {getTimeTaken(item!.timeEnded!, item!.timeStarted!)}
      </p>
    </CardContent>

  </Card>
  )
}

export default HistoryItem