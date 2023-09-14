import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Wrapper = ({children}: Props) => {
  return (
    <div className='px-8 sm:px-12 md:px-16 lg:px-32'>
        {children}
    </div>
  )
}

export default Wrapper