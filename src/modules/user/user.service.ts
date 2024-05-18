import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { AddUserInput } from "./user.schema";

export async function addUser(input: AddUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password)

    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })

    return user
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export async function getUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        }
    })
}

export async function sendEmail(user: any, content: any) {
    return;
}
