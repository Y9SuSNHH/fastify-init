import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { AddUserInput, LoginInput } from "./user.schema";
import { addUser, getUserByEmail, sendEmail } from "./user.service";

export async function registerAction(input: AddUserInput) {

    const user = addUser(input)

    if (user) {
        await registed(user)
    }

    return user;
}

export async function loginAction(input: LoginInput) {
    const user = await getUserByEmail(input.email)

    // find user by email
    if (!user) {
        return {
            code: 401,
            send: {
                message: "Invalid email or password",
            }
        }
    }

    //verify password
    const correctPassword = verifyPassword({
        candidatePassword: input.password,
        salt: user.salt,
        hash: user.password
    })

    // generate access token
    if (correctPassword) {
        const { password, salt, ...rest } = user;

        const accessToken = server.jwt.sign(rest)
        return {
            code: 200,
            send: {
                accessToken
            }
        }
    }

    return {
        code: 401,
        send: {
            message: "Invalid email or password"
        }
    };
}

async function registed(user: any) {
    sendEmailToVerify(user)
    return;
}

async function sendEmailToVerify(user: any) {
    const content = 'Click to verify'
    await sendEmail(user, content)
    return;
}
