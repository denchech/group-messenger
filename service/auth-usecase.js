import prisma from "../libs/prisma";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import validator from "validator";

export async function getToken({username, password}, result) {
    if (!validate()) {
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            name: username
        }
    });

    if (!user) {
        result.unauthorized();
        return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        result.unauthorized();
        return;
    }

    const newToken = jwt.sign({data: username}, process.env.TOKEN_SECRET, {expiresIn: '1w'});

    await prisma.apiToken.upsert({
        where: {
            userId: user.id
        },
        update: {
            token: newToken
        },
        create: {
            userId: user.id,
            token: newToken
        }
    });

    result.noResult();

    return newToken;

    function validate() {
        if (!username || validator.isEmpty(username)) {
            result.error(400, "Username is required.", "username");
            return false;
        }

        if (!password || validator.isEmpty(password)) {
            result.error(400, "Password is required.", "password");
            return false;
        }

        return true
    }
}

export async function logout({token}, result) {
    if (token) {
        const existentToken = await prisma.apiToken.findUnique({
            where: {
                token: token
            }
        });

        if (existentToken) {
            await prisma.apiToken.delete({
                where: {
                    id: existentToken.id
                }
            });

        }

    }

    result.passable(204, {});
}

export async function getUser({token}, result) {
    const user = await findUser({token});

    if (user) {
        result.passable(200, user);
        return;
    }

    result.forbidden();
}

export async function findUser({token}) {
    return jwt.verify(token, process.env.TOKEN_SECRET, async function (err, _) {
        if (err) {
            return null;
        }

        return await prisma.apiToken.findUnique({
            select: {
                user: true
            },
            where: {
                token: token
            }
        });
    });
}
