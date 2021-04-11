import {findUser} from "../service/auth-usecase";
import Cookies from "cookies"
import Result from "../service/result";


const authMiddleware = handler => {
    return async (request, response) => {
        const cookies = new Cookies(request, response);
        const token = cookies.get('Authorization');

        let user;
        if (token && (user = await findUser({token}))) {
            request.user = user.user;

            await handler(request, response);

            return;
        }

        const result = new Result();
        result.forbidden();

        response.status(result.code).json(result.data);
    };
}

export default authMiddleware;