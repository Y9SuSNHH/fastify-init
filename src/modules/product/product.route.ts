import { FastifyInstance } from "fastify";
import { getProductsController, createProductController } from "./product.controller"
import { $ref } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
    server.get('/', {
        preHandler: [
            server.authenticate
        ],
    }, getProductsController)

    server.post('/', {
        preHandler: [
            server.authenticate
        ],
        schema: {
            body: $ref('addProductSchema'),
            response: {
                201: $ref('productResponseSchema'),
            }
        },
    }, createProductController)
}

export default productRoutes