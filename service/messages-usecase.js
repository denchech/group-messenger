import prisma from '../libs/prisma'

export async function getMessageCollection ({ chatId }, result) {
  chatId ??= ''

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
          }
        }
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    })
  )
}
