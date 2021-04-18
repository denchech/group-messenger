const jwt = require("jsonwebtoken");
const {prisma} = require("../libs/prisma.d");

const authSocketMiddleware = async function(socket, next) {
    const token = socket.handshake.auth;

    let user;
    if (token && (user = await findUser(token))) {
        socket.request.user = user.user;
        next();

        return;
    }

    const error = new Error("Unauthorized");
    error.type = "unauthorized";

    return next(error);
}

async function findUser(token) {
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

module.exports = {
    authSocketMiddleware
};
