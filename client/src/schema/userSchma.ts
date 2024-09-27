import { z } from 'zod';

export const userSignUpSchema = z.object({
    username: z.string().min(1, "*Username is required"),
    email: z.string().email("*Invalid email"),
    password: z.string().min(6, "*Password must be at least 6 characters"),
})

export const userSignInSchema = z.object({
    email: z.string().email("*Invalid email or cheatmeal id"),
    password: z.string().min(6, "*Password must be at least 6 characters"),
})

export type userSignUpTypes = z.infer<typeof userSignUpSchema>
export type userSignInTypes = z.infer<typeof userSignInSchema>