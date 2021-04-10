import {getChatCollection} from "../../../service/chat-handler";
import Result from "../../../service/result";
import authMiddleware from "../../../middleware/authMiddleware";

async function handler(request, response) {
    const result = new Result();

    switch (request.method) {
        case "GET":
            await getChatCollection(result);
            break;
        default:
            result.unsupported();
    }

    response.status(result.code).json(result.data);

}

export default authMiddleware(handler);
