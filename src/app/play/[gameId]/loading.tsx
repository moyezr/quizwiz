import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

type Props = {}

const MCQLoading = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex w-full justify-between items-center">
      <Skeleton className='w-20 h-8' /> 
      <Skeleton className='w-24 h-8' /> 
    </div>

    <Card className="text-bold px-4 py-2">
      <Skeleton className='w-full h-6' />
    </Card>
   
    <Skeleton className='w-full h-8' />
    <Skeleton className='w-full h-8' />
    <Skeleton className='w-full h-8' />
    <Skeleton className='w-full h-8' />
    <Skeleton className='w-16 h-10' />
  </div>
  )
}

export default MCQLoading