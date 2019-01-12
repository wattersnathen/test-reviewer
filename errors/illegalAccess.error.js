const BaseError = require('./base.error')

class IllegalAccessError extends BaseError {
    constructor(message) {
        super(message)
    }
}