class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.errors = errors;
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor() {
        if (message) {
            super(message);
        } else {
            super("Not found");
        }
        this.status = 404;
    }
}

module.exports = {
    BadRequestError,
    NotFoundError
}
