import prisma from '../libs/prisma'

export async function getChatCollection (result) {
  result.passable(
    200,
    await prisma.chat.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    })
  )
}
