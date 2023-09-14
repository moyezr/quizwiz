import React from 'react'
import { Badge } from './ui/badge';

type Props = {
    totalQuestions: number;
    currentIndex: number;
}

const QuizCounter = ({totalQuestions, currentIndex}: Props) => {

  return (
    <Badge variant="secondary" className='text-sm sm:text-base md:text-lg'>
        {` ${currentIndex + 1} / ${totalQuestions}`}
    </Badge>
  )
}

export default QuizCounter