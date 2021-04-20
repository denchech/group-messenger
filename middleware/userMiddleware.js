import { findUser } from '../service/auth-usecase'
import Cookies from 'cookies'

const userMiddleware = handler => {
  return async (request, response) => {
    const cookies = new Cookies(request, response)
    const token = cookies.get('Authorization')

    let user
    if (token && (user = await findUser({ token }))) {
      request.user = user.user
    } else {
      request.user = null
    }

    await handler(request, response)
  }
}

export default userMiddleware
