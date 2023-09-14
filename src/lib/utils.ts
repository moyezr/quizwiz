import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}
