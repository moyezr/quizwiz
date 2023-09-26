import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}

export function promptGenerator(topic: string, questionNumber: number): string {
  const prompt: string = `
  You are a quiz master. 

        Generate ${questionNumber} multiple-choice type questions with randome hardness on topic ${topic} with one answer and four other options.
        
        Put the in a JSON list format as following:
        {
        "question": "<The question>",
        "answer": "<The exact answer. Don't write 'Option Number' here! >",
        "options": ["<option1>", "<option2>", "<option3>", "<option4>"]
        }
        
        Only answer with the JSON array, nothing else.
  `;

  return prompt;
}
