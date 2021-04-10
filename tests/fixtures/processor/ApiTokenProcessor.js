const jwt = require("jsonwebtoken");

class ApiTokenProcessor {
    static dates = [
        "1s",
        "1h",
        "1w",
        "1m"
    ];

    preProcess(name, object) {
        return {
            ...object,
            token: jwt.sign({
                data: object.user.name
            }, process.env.TOKEN_SECRET, {expiresIn: ApiTokenProcessor.dates[Math.floor(Math.random() * ApiTokenProcessor.dates.length)]})
        };
    }
}

module.exports.default = ApiTokenProcessor
