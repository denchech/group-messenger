import prisma from '../libs/prisma'

export async function getChatCollection ({ search }, result) {
  result.passable(
    200,
    await prisma.chat.findMany({
      where: {
        name: {
          contains: search,
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
