import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Wrapper from '@/components/Wrapper'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const QuizCreationLayout = async ({children}: Props) => {
    const session = await getAuthSession();

    if(!session?.user) {
        return redirect("/");
    }
  return (
    <Wrapper>
    <Header session={session} />
    {children}
    <Footer />
    </Wrapper>
  )
}

export default QuizCreationLayout