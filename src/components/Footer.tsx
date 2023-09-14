import { Separator } from './ui/separator'
import { Heart } from 'lucide-react'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='pt-28 flex flex-col justify-between gap-6 items-center w-full text-center'>
        <Separator />
        <h3 className='pb-6 flex items-center gap-2'>Copyright &#169; QuizWiz. 2023 Designed & Developed with <Heart size={20} /> by Moyez Rabbani </h3>
    </div>
  )
}

export default Footer