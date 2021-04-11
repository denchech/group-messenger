import prisma from "../libs/prisma";
import validator from "validator";

export async function getMessageCollection({chatId}, result) {
    chatId ??= "";

    result.passable(
        200,
        await prisma.message.findMany({
            where: {
                chatId: chatId
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
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        })
    );
}

export async function postMessageCollection({userId, chatId, text}, result) {
    if (!validate()) {
        return;
    }

    const chat = await prisma.chat.findUnique({
        where: {
            id: chatId
        }
    });

    if (!chat) {
        result.error(400, "Chat does not exist.");
    }

    const message = await prisma.message.create({
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

    result.passable(200, message);

    function validate() {
        if (!text || validator.isEmpty(text)) {
            result.error(400, "Text is required", "text");
            return false;
        }

        return true;
    }
}