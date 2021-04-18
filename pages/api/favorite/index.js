import Result from "../../../service/result";
import authHttpMiddleware from "../../../middleware/authHttpMiddleware";
import {getFavoriteCollection} from "../../../service/favorite-usecase";

async function handler(request, response) {
    const result = new Result();

    switch (request.method) {
        case "GET":
            await getFavoriteCollection({userId: request.user.id}, result);
            break;
        default:
            result.unsupported()
    }

    response.status(result.code).json(result.data);
}

export default authHttpMiddleware(handler)
