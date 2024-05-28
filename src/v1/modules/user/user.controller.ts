import { AddUserInput, LoginInput } from './user.schema';
import { FastifyReply, FastifyRequest } from "fastify";
import { getUsers } from "./user.service";
import { loginAction, registerAction } from './user.action';

export async function registerUserController(
    request: FastifyRequest<{
        Body: AddUserInput,
    }>,
    reply: FastifyReply) {
    const body = request.body

    try {
        const user = await registerAction(body)

        return reply.code(201).send(user)
    } catch (e) {
        return reply.code(500).send(e)
    }
}

export async function loginController(
    request: FastifyRequest<{
        Body: LoginInput,
    }>,
    reply: FastifyReply) {
    const body = request.body

    try {
        const { code, send } = await loginAction(body)

        return reply.code(code).send(send)
    } catch (e) {
        return reply.code(500).send(e)
    }
}

export async function getUsersController(
    request: FastifyRequest,
    reply: FastifyReply) {
    const body = request.body

    try {
        const users = await getUsers()

        return reply.code(200).send(users)
    } catch (e) {
        return reply.code(500).send(e)
    }
}