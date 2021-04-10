import Result from "../../service/result";
import {getToken, logout} from "../../service/auth-usecase";
import Cookies from "cookies"

export default async function handler(request, response) {
    const result = new Result();
    const cookie = new Cookies(request, response);

    switch (request.method) {
        case "POST":
            const token = await getToken(request.body, result);
            if (result.isPassable()) {
                cookie.set('Authorization', token, {httpOnly: true});
            }
            break;
        case "DELETE":
            await logout({token: cookie.get('Authorization')}, result);
            cookie.set('Authorization', null);
            break;
        default:
            result.unsupported()
    }

    response.status(result.code).json(result.data);
}
