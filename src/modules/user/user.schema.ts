import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

const userInput = {
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
        .email(),
    name: z.string(),
}

const addUserSchema = z.object({
    ...userInput,
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }),
})

const addUserResponseSchema = z.object({
    id: z.number(),
    ...userInput,
})

const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
        .email(),
    password: z.string(),
})

const loginResponseSchema = z.object({
    accessToken: z.string(),
})

export type AddUserInput = z.infer<typeof addUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    addUserSchema,
    addUserResponseSchema,
    loginSchema,
    loginResponseSchema,
}, { $id: "userSchemas" })