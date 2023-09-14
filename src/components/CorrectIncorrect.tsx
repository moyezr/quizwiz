import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react';

type Props = {
    correctAnswers: number,
    wrongAnswers: number;
}

const CorrectIncorrect = ({correctAnswers, wrongAnswers}: Props) => {
  return (
    <div className='flex gap-4'>
        <div className="flex gap-2">{correctAnswers} <CheckCircle color='green' /></div>
        <div className="flex gap-2">{wrongAnswers} <XCircle color='red' /></div>
    </div>
  )
}

export default CorrectIncorrect