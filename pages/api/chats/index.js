import { getChatCollection } from '../../../service/chat-handler'
import Result from '../../../service/result'
import authHttpMiddleware from '../../../middleware/authHttpMiddleware'

async function handler (request, response) {
  const result = new Result()

  switch (request.method) {
    case 'GET':
      await getChatCollection({search: request.query.search}, result)
      break
    default:
      result.unsupported()
  }

  response.status(result.code).json(result.data)
}

export default authHttpMiddleware(handler)
