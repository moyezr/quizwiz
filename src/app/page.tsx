import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignInButton from "@/components/SignInButton";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "QuizWiz",
  description: `Explore the world of quizzes like never before with QuizWiz! Input your desired topic, and watch as our intelligent AI generates a personalized quiz just for you. Engage in a battle of wits with multiple-choice questions that challenge your knowledge and quick thinking. QuizWiz offers a diverse range of topics, from history and science to pop culture and more, ensuring there's something for everyone.

  QuizWiz leverages the power of artificial intelligence to provide an immersive and dynamic quiz experience. With each question, you'll not only test your knowledge but also learn fascinating facts and tidbits along the way. Track your progress, compete with friends, and become a QuizWiz champion.
  
  Get ready to embark on a quiz adventure like no other! QuizWiz is your passport to endless hours of entertainment and intellectual stimulation. Start quizzing now and see if you have what it takes to be a QuizWiz master!`,
};

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div>
      <Wrapper>
        <Header session={session} />
        <main className="flex flex-col w-full gap-[70px] justify-center items-center">
          <h1 className="text-8xl font-semibold text-center tracking-tighter text-[120px] sm:text-[150px] md:text-[200px] text-gradient">
            Let&apos;s Quiz
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
            Dive into AI-Powered Knowledge with Mind-Boggling Multiple Choice
            Questions
          </p>

          {session ? (
            <Link href="/dashboard">
              <Button className="text-3xl px-8 py-8 font-semibold dark:text-gray-700 rounded-full">
                Play
              </Button>
            </Link>
          ) : (
            <SignInButton />
          )}
        </main>
        <Footer />
      </Wrapper>
    </div>
  );
}
