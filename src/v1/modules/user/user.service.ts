import { pgSqlDrizzle } from "../../../../db";
import { hashPassword } from "../../utils/hash";
// import prisma from "../../utils/prisma";
import { posts, users } from './../../../../db/drizzle/pgsql/schema';
import { AddUserInput } from "./user.schema";
import { eq } from "drizzle-orm";

export async function addUser(input: AddUserInput) {
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password)

    console.log({ ...rest, salt, password: hash })
    const newUser = await pgSqlDrizzle
        .insert(users)
        .values({ ...rest, salt, password: hash })
        .returning();


    await pgSqlDrizzle
        .insert(posts)
        .values({ authorId: newUser[0].id, content: 'first register content' })
        .execute();

    return newUser[0]
}

export async function getUserByEmail(email: string) {
    const user = await pgSqlDrizzle
        .query
        .users
        .findFirst({
            where: eq(users.email, email)
        });
    return user;
}

export async function getUsers() {
    return pgSqlDrizzle.select({
        id: users.id,
        email: users.email,
        name: users.name,
    }).from(users)
}

export async function sendEmail(user: any, content: any) {
    return;
}
