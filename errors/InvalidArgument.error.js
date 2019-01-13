const BaseError = require('./base.error')

class InvalidArgumentError extends BaseError {
    constructor(message) {
        super(message)
    }
}

module.exports = InvalidArgumentError