import { FastifyReply, FastifyRequest } from "fastify";
import { AddProductInput } from "./product.schema";
import { addProduct, getProducts } from "./product.service";

export async function createProductController(
    request: FastifyRequest<{
        Body: AddProductInput,
    }>,
    reply: FastifyReply) {
    const body = request.body

    try {
        const product = await addProduct({
            ...request.body,
            ownerId: request.user.id,
        });

        return reply.code(201).send(product)
    } catch (e) {
        return reply.code(500).send(e)
    }
}

export async function getProductsController(
    request: FastifyRequest,
    reply: FastifyReply) {
    try {
        const products = await getProducts();

        return reply.code(200).send(products)
    } catch (e) {
        return reply.code(500).send(e)
    }
}