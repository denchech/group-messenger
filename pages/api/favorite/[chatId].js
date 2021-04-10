import Result from "../../../service/result";
import authMiddleware from "../../../middleware/authMiddleware";
import {updateFavoriteCollection} from "../../../service/favorite-usecase";

async function handler(request, response) {
    const result = new Result();

    switch (request.method) {
        case "PUT":
            await updateFavoriteCollection({
                userId: request.user.id,
                chatId: request.query.chatId
            }, result);
            break;
        default:
            result.unsupported()
    }

    response.status(result.code).json(result.data);
}

export default authMiddleware(handler)
