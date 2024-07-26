import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  options: z.string().array().length(4),
});

export const apiResponseSchema = z.object({
  questions: z.array(questionSchema),
});

// export const openAiSchema = {
//     "type": "object",
//     "properties": {
//     "type": "array",
//    "items" : {
//     "type": "object",
//     "properties": {
//         "question": {
//             "type": "string",
//             "description": "The generated question"
//         },
//         "answer": {
//             "type": "string",
//             "description": "The generated Answer"
//         },
//         "options": {
//             "type": "array",
//             "items": { "type": "string" }
//         }
//     }
//    }
// }
//   }
