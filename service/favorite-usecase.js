import prisma from "../libs/prisma";

export async function getFavoriteCollection({userId}, result) {
    const data = {
        chats: (await prisma.favorite.findMany({
            select: {
                chatId: true
            },
            where: {
                userId: userId
            }
        })).map((favorite) => favorite.chatId)
    }

    result.passable(200, data);
}

export async function updateFavoriteCollection({userId, chatId}, result) {
    let isFavorite
    if ((isFavorite = await favoriteExists(userId, chatId))) {
        await prisma.favorite.delete({
            where: {
                userId_chatId: {
                    userId: userId,
                    chatId: chatId
                }
            }
        });
    } else {
        const chatCount = await prisma.chat.count({
            where: {
                id: chatId
            }
        });

        if (chatCount === 0) {
            result.error(400, "Chat does not exist");
            return;
        }

        await prisma.favorite.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                chat: {
                    connect: {
                        id: chatId
                    }
                }
            }
        });
    }

    result.passable(200, {
        chat: {
            id: chatId,
            isFavorite: !isFavorite,
        }
    });
}

async function favoriteExists(userId, chatId) {
    const favoriteCount = await prisma.favorite.findUnique({
        where: {
            userId_chatId: {
                userId: userId,
                chatId: chatId
            }
        }
    });

    return favoriteCount !== null;
}
