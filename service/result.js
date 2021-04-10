export default class Result {
    #code;
    #data;

    get code() {
        return this.#code;
    }

    get data() {
        return this.#data;
    }

    error(code, message, path = null) {
        this.#code = code;
        this.#data = {
            error: message,
            path: path
        };
    }

    passable(code, data) {
        this.#code = code;
        this.#data = data;

        return this;
    }

    unsupported() {
        this.error(405, "Unsupported operation.");
    }

    unauthorized(message = "Wrong username or password ") {
        this.error(401, message);
    }

    forbidden() {
        this.error(403, "Invalid token.")
    }

    noResult() {
        this.passable(204, {});
    }

    isPassable() {
        return this.#code && this.#code >= 200 && this.#code < 299;
    }
}