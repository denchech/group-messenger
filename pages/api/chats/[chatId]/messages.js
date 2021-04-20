import { getMessageCollection } from '../../../../service/messages-usecase'
import Result from '../../../../service/result'
import authHttpMiddleware from '../../../../middleware/authHttpMiddleware'
import { postMessageCollection } from '../../../../service/messages-usecase.d'

async function handler (request, response) {
  const result = new Result()

  switch (request.method) {
    case 'GET':
      await getMessageCollection({ chatId: request.query.chatId }, result)
      break
    case 'POST':
      await postMessageCollection({
        userId: request.user.id,
        chatId: request.query.chatId,
        text: request.body.text
      }, result)
      break
    default:
      result.unsupported()
  }

  response.status(result.code).json(result.data)
}

export default authHttpMiddleware(handler)
