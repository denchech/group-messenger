import Result from "../../service/result";
import userMiddleware from "../../middleware/userMiddleware";

async function handler(request, response) {
    const result = new Result();

    switch (request.method) {
        case "GET":
            result.passable(200, request.user);
            break;
        default:
            result.unsupported()
    }

    response.status(result.code).json(result.data);
}

export default userMiddleware(handler);
