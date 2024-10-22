class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.status = 400;
        this.errors = errors;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        } else {
            super("Not found");
        }
        this.status = 404;
    }
}

class InternalServerError extends Error {
    constructor(errors) {
        super("Internal Server Error");
        this.status = 500;
        this.errors = errors;
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    InternalServerError,
}

