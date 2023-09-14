import QuizCreationForm from "@/components/QuizCreationForm";
import React from "react";

type Props = {};

export const metadata = {
  title: "Create Quiz | QuizWiz",
};
const QuizPage = async (props: Props) => {
  return (
    <main className="pt-8 flex flex-col gap-8 justify-center items-center min-h-[60vh]">
      {/* <h1 className='tracking-tighter text-7xl font-bold'>
            Choose Your Topic
          </h1> */}
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
        <QuizCreationForm />
      </div>
    </main>
  );
};

export default QuizPage;
