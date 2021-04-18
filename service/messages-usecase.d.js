const {prisma} = require("../libs/prisma.d");
const validator = require("validator");

const postMessageCollection = async function ({userId, chatId, text}) {
    validate();

    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        }
    });

    if (!chat) {
        throw new Error("Chat does not exist.");
    }

    return await prisma.message.create({
        data: {
            author: {
                connect: {
                    id: userId
                }
            },
            chat: {
                connect: {
                    id: chatId
                }
            },
            text: text
        },
        select: {
            id: true,
            text: true,
            author: {
                select: {
                    id: true,
                    name: true
                },
            }
        },
    });

    function validate() {
        if (!chatId || validator.isEmpty(chatId)) {
            throw new Error("Chat is required");
        }

        if (!text || validator.isEmpty(text)) {
            throw new Error("Text is required");
        }
    }
}

module.exports = {
    postMessageCollection
}