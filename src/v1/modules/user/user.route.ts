import { FastifyInstance } from "fastify";
import { getUsersController, loginController, registerUserController } from "./user.controller"
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.get('/', {
        preHandler: [
            server.authenticate
        ],
    }, getUsersController)

    server.post('/', {
        schema: {
            body: $ref('addUserSchema'),
            response: {
                201: $ref('addUserResponseSchema'),
            }
        },
    }, registerUserController)

    server.post('/login', {}, loginController)
}

export default userRoutes