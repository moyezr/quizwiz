import {z} from "zod"
export const quizCreationSchema = z.object({
    topic: z.string().min(3, {
        message: "Topic must be of at least 3 letters"
    }).max(20, {
        message: "Topic must not exceed 20 letters"
    }),
    questionNumber: z.coerce.number().min(3, {
        message: "No. of Questions must at least be 3"
    }).max(10, {
        message: "No. of Questions must not exceed 10"
    }).default(5)
})