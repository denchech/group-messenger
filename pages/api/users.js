import Result from "../../service/result";
import userMiddleware from "../../middleware/userMiddleware";
import {createUser} from "../../service/auth-usecase";
import Cookies from "cookies";

async function handler(request, response) {
    const result = new Result();

    switch (request.method) {
        case "GET":
            result.passable(200, request.user);
            break;
        case "POST":
            const cookie = new Cookies(request, response);
            if (request.user) {
                result.error(400, "User already logged in.");
                break;
            }
            const token = await createUser(request.body, result);

            if (result.isPassable()) {
                cookie.set('Authorization', token, {httpOnly: true});
            }
            break;
        default:
            result.unsupported()
    }

    response.status(result.code).json(result.data);
}

export default userMiddleware(handler);
