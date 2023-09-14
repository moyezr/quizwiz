import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Timer as TimerIcon } from 'lucide-react'

type Props = {
    questionIndex: number;
}

const Timer = ({questionIndex}: Props) => {

    const [count, setCount] = useState<number>(30)

    const timer = () => {
   
        setCount(prev => prev + 1);
    }

    useEffect(() => {
        const interval = setInterval(timer, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])

  return (
    <div className='flex gap-2 items-center'>
        {count}<TimerIcon />
    </div>
  )
}

export default Timer